'use client';

import * as React from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { BorderBeam } from '@/components/ui/border-beam';
import { cn } from '@/lib/utils';

import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  Receipt,
  Search,
} from 'lucide-react';

interface PaymentRecord {
  amount: number | string;
  mode: string;
  timestamp?: string;
  [key: string]: unknown;
}

interface Member {
  _id: string;
  name: string;
  phone?: string;
  amount: number | string;
  payments?: PaymentRecord[];
}

interface ServiceMembershipStatusProps {
  data: (Record<string, unknown> | Member)[];
  year: string;
}

const TOTAL_MONTHS = 12;
const MONTH_LABELS = [
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
];

function computeRowStats(member: Member) {
  const memberAmount = Number(member.amount || 0);
  const payments = Array.isArray(member.payments) ? member.payments : [];
  const totalPaid = payments.reduce(
    (sum, p) => sum + Number(p?.amount || 0),
    0
  );
  const monthlyAmount = Math.round(memberAmount / TOTAL_MONTHS) || 0;
  const monthsPaid =
    monthlyAmount > 0 ? Math.floor(totalPaid / monthlyAmount) : 0;
  const safeMonthsPaid = Number.isFinite(monthsPaid) ? monthsPaid : 0;
  const due = memberAmount - totalPaid;
  return {
    memberAmount,
    monthlyAmount,
    monthsPaid: safeMonthsPaid,
    totalPaid,
    due,
    count: payments.length,
  };
}

export function ServiceMembershipStatus({
  data = [],
  year,
}: ServiceMembershipStatusProps) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = React.useState('');
  const isInternal = searchParams.get('mode') === 'internal';

  const sanitizedData = React.useMemo(() => {
    return (Array.isArray(data) ? (data as unknown as Member[]) : []).filter(
      (m) => Number(m.amount) !== 0
    );
  }, [data]);

  // Persist opened WhatsApp member link to device list for quick family access
  React.useEffect(() => {
    if (sanitizedData.length === 1 && !isInternal) {
      try {
        const member = sanitizedData[0];
        const existingStr = localStorage.getItem('madhyanchal_members_list');
        let list: Array<{ id: string; name: string }> = existingStr
          ? JSON.parse(existingStr)
          : [];

        // Deduplicate
        list = list.filter((m) => m.id !== member._id);

        // Add to top of list
        list.unshift({ id: member._id, name: member.name });

        // Limit to max 5 profiles
        if (list.length > 5) list = list.slice(0, 5);

        localStorage.setItem('madhyanchal_members_list', JSON.stringify(list));
      } catch {
        // Ignore storage error
      }
    }
  }, [sanitizedData, isInternal]);

  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) return sanitizedData;
    const term = searchTerm.toLowerCase();
    return sanitizedData.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        (m.phone && m.phone.includes(term))
    );
  }, [sanitizedData, searchTerm]);

  const totals = React.useMemo(() => {
    const totalAmount = filteredData.reduce(
      (sum, member) => sum + Number(member.amount || 0),
      0
    );
    const totalDue = filteredData.reduce((dueSum, member) => {
      const { due } = computeRowStats(member);
      return dueSum + due;
    }, 0);
    const totalCount = filteredData.reduce((countSum, member) => {
      const { count } = computeRowStats(member);
      return countSum + count;
    }, 0);

    const totalReceived = filteredData.reduce((sum, member) => {
      const { totalPaid } = computeRowStats(member);
      return sum + totalPaid;
    }, 0);

    const razorpayDeduction = totalReceived * 0.0236;
    const netReceived = totalReceived - razorpayDeduction;

    return {
      totalAmount,
      totalDue,
      totalCount,
      totalReceived,
      razorpayDeduction,
      netReceived,
    };
  }, [filteredData]);

  const exportCSV = React.useCallback(() => {
    const headers = [
      'Name',
      'Phone',
      'Monthly Amount',
      ...MONTH_LABELS.slice(0, TOTAL_MONTHS),
      'Due',
      'Count',
    ];
    const rows = filteredData.map((member) => {
      const { monthlyAmount, monthsPaid, due, count } = computeRowStats(member);
      const months = Array.from({ length: TOTAL_MONTHS }, (_, i) =>
        i < monthsPaid ? 'Paid' : 'Pending'
      );
      return [
        member.name,
        member.phone ?? '',
        monthlyAmount,
        ...months,
        due,
        count,
      ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `membership-status-${year}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filteredData, year]);

  // Single Member Detailed Card View
  if (sanitizedData.length === 1 && !isInternal) {
    const member = sanitizedData[0];
    const { monthlyAmount, monthsPaid, due, count } = computeRowStats(member);
    const progress = Math.min((monthsPaid / TOTAL_MONTHS) * 100, 100);
    const isFullyPaid = due <= 0;
    const recentPayments = Array.isArray(member.payments)
      ? [...member.payments].reverse()
      : [];

    return (
      <div className="card-glass card-hover-glow relative space-y-6 overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-8 dark:border-white/12">
        <BorderBeam
          size={160}
          duration={6}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        {/* Member Title Banner */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-4 dark:border-white/10">
          <div className="min-w-0 flex-1">
            <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Subscription Status {year}
            </span>
            <h2 className="font-paytone truncate text-base text-slate-900 sm:text-2xl dark:text-white">
              {member.name}
            </h2>
            {member.phone && (
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {member.phone}
              </p>
            )}
          </div>

          {isFullyPaid ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black text-emerald-600 sm:gap-1.5 sm:px-3.5 sm:text-xs dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Fully Paid
            </span>
          ) : (
            <Link
              href={`/services/${year}/membership/${member._id}`}
              className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 px-3.5 py-2 text-xs font-black text-stone-950 shadow-md transition-transform hover:scale-[1.02] sm:gap-1.5 sm:px-5 sm:py-2.5"
            >
              <span>Pay Due</span>
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          )}
        </div>

        {/* Stat Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200/80 bg-white/60 p-3 dark:border-white/10 dark:bg-stone-900/60">
            <span className="block text-[9.5px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Monthly Amount
            </span>
            <span className="font-paytone text-base text-slate-900 sm:text-xl dark:text-white">
              ₹{monthlyAmount}
            </span>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white/60 p-3 dark:border-white/10 dark:bg-stone-900/60">
            <span className="block text-[9.5px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Payment Progress
            </span>
            <span className="font-paytone text-base text-amber-600 sm:text-xl dark:text-amber-400">
              {monthsPaid} / 12 Months
            </span>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white/60 p-3 dark:border-white/10 dark:bg-stone-900/60">
            <span className="block text-[9.5px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Outstanding Due
            </span>
            <span
              className={`font-paytone text-base sm:text-xl ${due > 0 ? 'text-rose-500' : 'text-emerald-500'}`}
            >
              ₹{due}
            </span>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white/60 p-3 dark:border-white/10 dark:bg-stone-900/60">
            <span className="block text-[9.5px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Total Paid
            </span>
            <span className="font-paytone text-base text-emerald-600 sm:text-xl dark:text-emerald-400">
              ₹{Number(member.amount) - due}
            </span>
          </div>
        </div>

        {/* Monthly Breakdown Visualization */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>12-Month Payment Breakdown</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">
              {progress.toFixed(1)}% Paid
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {MONTH_LABELS.slice(0, TOTAL_MONTHS).map((label, i) => {
              const isPaid = i < monthsPaid;
              return (
                <div
                  key={label}
                  className={`rounded-xl border p-2 text-center transition-all ${
                    isPaid
                      ? 'border-emerald-500/40 bg-emerald-500/15 font-bold text-emerald-600 dark:text-emerald-400'
                      : 'border-slate-300/80 bg-white/40 text-slate-400 dark:border-white/10 dark:bg-stone-900/40'
                  }`}
                >
                  <span className="block text-[9px] font-extrabold tracking-wider uppercase">
                    {label}
                  </span>
                  <span className="text-[10px] font-bold">
                    {isPaid ? '✓ Paid' : 'Due'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transaction History Log */}
        <div className="space-y-2.5 pt-2">
          <h4 className="font-paytone flex items-center gap-1.5 text-xs text-slate-900 sm:text-sm dark:text-white">
            <Receipt className="h-4 w-4 text-amber-500" /> Recent Transactions (
            {count})
          </h4>

          <div className="no-scrollbar max-h-[220px] space-y-2 overflow-y-auto pr-1">
            {recentPayments.length > 0 ? (
              recentPayments.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white/70 p-3 text-xs dark:border-white/10 dark:bg-stone-900/70"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">
                        Contribution Received
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {p.timestamp || 'Verified'} • {p.mode}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">
                    +₹{p.amount}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center gap-1 py-6 text-center text-xs text-slate-500">
                <Clock className="h-6 w-6 text-slate-400" /> No transactions
                recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Multi-Member Table View
  return (
    <div className="space-y-5">
      {/* Search & Export Toolbar */}
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className={cn('relative w-full', isInternal && 'sm:w-72')}>
          <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search member by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-slate-300/80 bg-white/90 py-2 pr-3.5 pl-9 text-xs text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
          />
        </div>

        {isInternal && (
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-600 transition-colors hover:bg-amber-500/20 sm:w-auto dark:text-amber-400"
          >
            <Download className="h-3.5 w-3.5" /> Export CSV Report
          </button>
        )}
      </div>

      {/* ADMIN SUMMARY DASHBOARD CARDS (Shown when isInternal mode is enabled) */}
      {isInternal && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            <div className="card-glass relative overflow-hidden rounded-xl border border-slate-200/90 p-2.5 sm:p-4 dark:border-white/12">
              <span className="block text-[9px] font-bold tracking-wider text-slate-400 uppercase sm:text-[10px]">
                Total Budgeted
              </span>
              <span className="font-paytone font-mono text-base text-slate-900 sm:text-xl dark:text-white">
                ₹{totals.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="card-glass relative overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/5 p-2.5 sm:p-4">
              <span className="block text-[9px] font-bold tracking-wider text-rose-400 uppercase sm:text-[10px]">
                Total Outstanding Due
              </span>
              <span className="font-paytone font-mono text-base text-rose-500 sm:text-xl">
                ₹{totals.totalDue.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="card-glass relative overflow-hidden rounded-xl border border-blue-500/30 bg-blue-500/5 p-2.5 sm:p-4">
              <span className="block text-[9px] font-bold tracking-wider text-blue-400 uppercase sm:text-[10px]">
                Gross Received
              </span>
              <span className="font-paytone font-mono text-base text-blue-500 sm:text-xl">
                ₹{totals.totalReceived.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="card-glass relative overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-2.5 sm:p-4">
              <span className="block text-[9px] font-bold tracking-wider text-emerald-400 uppercase sm:text-[10px]">
                Total Transactions
              </span>
              <span className="font-paytone font-mono text-base text-emerald-500 sm:text-xl">
                {totals.totalCount}
              </span>
            </div>
          </div>

          {/* PROMINENT NET SETTLED AMOUNT BANNER (Minus 2.36% Razorpay Fee) */}
          <div className="card-glass relative flex flex-col justify-between gap-3 overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-amber-500/10 p-3.5 sm:flex-row sm:items-center sm:p-5">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[8.5px] font-black tracking-wider text-emerald-600 uppercase sm:text-[9.5px] dark:text-emerald-300">
                ✦ Net Settled in Bank (Post Gateway Charge) ✦
              </span>
              <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                <span className="font-paytone font-mono text-2xl font-black text-emerald-600 sm:text-3xl dark:text-emerald-400">
                  ₹{Math.round(totals.netReceived).toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 sm:text-xs dark:text-slate-400">
                  Net Amount Received
                </span>
              </div>
            </div>

            <div className="flex w-full flex-row items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white/80 p-2.5 sm:w-auto sm:flex-col sm:items-end sm:justify-center sm:px-3.5 sm:py-2 dark:border-white/10 dark:bg-stone-900/80">
              <div className="flex flex-col text-left sm:text-right">
                <span className="text-[9.5px] font-bold text-slate-500 sm:text-[10px] dark:text-slate-400">
                  Gross Received
                </span>
                <span className="font-mono text-xs font-bold text-slate-800 dark:text-white">
                  ₹{totals.totalReceived.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[9.5px] font-bold text-rose-500 sm:text-[10px]">
                  -2.36% Gateway Fee
                </span>
                <span className="font-mono text-xs font-bold text-rose-500">
                  -₹
                  {Math.round(totals.razorpayDeduction).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Members Status Cards Grid */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        {filteredData.map((member) => {
          const { monthlyAmount, monthsPaid, totalPaid, due, count } =
            computeRowStats(member);
          const detailRoute = `/services/${year}/membership/${member._id}/status`;

          return (
            <div
              key={member._id}
              className="card-glass card-hover-glow relative space-y-3 overflow-hidden rounded-xl border border-slate-200/90 p-3.5 backdrop-blur-2xl transition-all duration-300 sm:p-5 dark:border-white/12"
            >
              <BorderBeam
                size={100}
                duration={6}
                colorFrom="#f59e0b"
                colorTo="#fef08a"
              />

              <div className="flex items-start justify-between">
                <div className="flex flex-col items-start gap-0.5">
                  {isInternal ? (
                    <Link
                      href={detailRoute}
                      className="font-paytone group inline-flex items-center gap-1.5 text-sm text-slate-900 transition-colors hover:text-amber-500 sm:text-base dark:text-white dark:hover:text-amber-400"
                    >
                      <span>{member.name}</span>
                      <ExternalLink className="h-3.5 w-3.5 text-amber-500 opacity-70 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ) : (
                    <h4 className="font-paytone text-sm text-slate-900 sm:text-base dark:text-white">
                      {member.name}
                    </h4>
                  )}

                  {member.phone && (
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {isInternal
                        ? member.phone
                        : `XXXXXXX${member.phone.slice(-4)}`}
                    </p>
                  )}

                  {isInternal && (
                    <div className="pt-0.5">
                      <span className="inline-flex items-center rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[9.5px] font-bold text-amber-600 dark:text-amber-400">
                        Monthly: ₹{monthlyAmount}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex rounded-md border px-2 py-0.5 text-[9px] font-black tracking-wider uppercase ${
                      due > 0
                        ? 'border-rose-500/30 bg-rose-500/15 text-rose-500'
                        : 'border-emerald-500/30 bg-emerald-500/15 text-emerald-500'
                    }`}
                  >
                    {due > 0 ? `Due: ₹${due}` : 'Fully Paid'}
                  </span>
                  {isInternal && due > 0 && (
                    <span className="block pt-0.5 text-[9.5px] font-bold text-emerald-500">
                      Paid: ₹{totalPaid}
                    </span>
                  )}
                  <span className="block pt-0.5 text-[9.5px] font-bold text-slate-400">
                    {count} Txns
                  </span>
                </div>
              </div>

              {/* Month Pills Progress */}
              <div className="space-y-1.5 border-t border-slate-200/80 pt-2.5 dark:border-white/10">
                <div className="flex justify-between text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  <span>12-Month Grid</span>
                  <span className="text-amber-600 dark:text-amber-400">
                    {monthsPaid} / 12 Paid
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-1">
                  {MONTH_LABELS.slice(0, TOTAL_MONTHS).map((label, i) => {
                    const isPaid = i < monthsPaid;
                    return (
                      <div
                        key={i}
                        title={`${label}: ${isPaid ? 'Paid' : 'Due'}`}
                        className={`h-4 rounded-xs transition-colors ${
                          isPaid
                            ? 'bg-emerald-500'
                            : 'bg-slate-200 dark:bg-stone-800'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
