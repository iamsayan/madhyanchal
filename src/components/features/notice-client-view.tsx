'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { NativeModal } from '@/components/ui/native-modal';
import { openLetterheadPrintWindow } from '@/lib/letterhead-pdf-helper';
import type { NoticeItem } from '@/types';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Clock,
  FileText,
  MapPin,
  Megaphone,
  Printer,
  Search,
  Share2,
  ShieldAlert,
  Sparkles,
  X,
  ChevronRight,
} from 'lucide-react';

/* ============================================================================
   STATIC NOTICES DATA (Will be fetched from Cockpit API in production)
   To integrate Cockpit API later:
   const notices = await cockpit.listContentItems<NoticeItem[]>('notices', {
     sort: { is_pinned: -1, publish_date: -1 }
   });
   ============================================================================ */
const getPublishedDate = (notice?: NoticeItem | null): string => {
  if (!notice?.published_at) return '';
  const dateStr = String(notice.published_at).replace(' ', 'T');
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(notice.published_at);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getEventDate = (notice?: NoticeItem | null): string => {
  if (!notice?.event_at) return '';
  const dateStr = String(notice.event_at).replace(' ', 'T');
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(notice.event_at);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getEventTime = (notice?: NoticeItem | null): string => {
  if (!notice?.event_at) return '';
  const timeStr = String(notice.event_at).replace(' ', 'T');
  const d = new Date(timeStr);
  if (isNaN(d.getTime())) return String(notice.event_at);
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const getNoticeVenue = (notice?: NoticeItem | null): string => {
  return notice?.event_venue?.trim() || '';
};

const isNoticeEventPast = (notice?: NoticeItem | null): boolean => {
  if (!notice?.event_at) return false;
  const timeStr = String(notice.event_at).replace(' ', 'T');
  const d = new Date(timeStr);
  if (isNaN(d.getTime())) return false;
  return d.getTime() < Date.now();
};

export default function NoticeClientView({
  notices = [],
  jsonLd,
  isDurgaPuja = false,
}: {
  notices?: NoticeItem[];
  jsonLd?: Record<string, unknown>;
  isDurgaPuja?: boolean;
}) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNoticeModal, setActiveNoticeModal] = useState<NoticeItem | null>(
    null
  );

  const basePath = isDurgaPuja ? '/durgapuja/notice' : '/notice';
  const allNotices = useMemo(() => {
    return notices.filter((notice) => {
      const refNo = notice.ref_no?.toUpperCase() || '';

      if (isDurgaPuja) {
        return refNo.includes('MSDPS');
      } else {
        return refNo.includes('MSJPS');
      }
    });
  }, [notices, isDurgaPuja]);

  // Direct URL linking support (e.g. /notice?id=notice-agm-2026 or ?notice=notice-agm-2026)
  useEffect(() => {
    const noticeId = searchParams.get('id') || searchParams.get('notice');
    if (noticeId) {
      const found = allNotices.find(
        (n) =>
          n._id === noticeId ||
          n.ref_no?.toLowerCase() === noticeId.toLowerCase()
      );
      if (found) {
        setActiveNoticeModal(found);
      }
    }
  }, [searchParams, allNotices]);

  const handleOpenNotice = (notice: NoticeItem) => {
    setActiveNoticeModal(notice);
    if (typeof window !== 'undefined' && notice._id) {
      window.history.replaceState(null, '', `${basePath}?id=${notice._id}`);
    }
  };

  const handleCloseNotice = () => {
    setActiveNoticeModal(null);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', basePath);
    }
  };

  const handleShareNotice = (notice: NoticeItem) => {
    if (typeof window === 'undefined' || !notice._id) return;
    const url = `${window.location.origin}${basePath}?id=${notice._id}`;
    if (navigator.share) {
      navigator
        .share({
          title: notice.title,
          text: `Official Notice: ${notice.title} - Madhyanchal Sarbajanin`,
          url: url,
        })
        .catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert('Notice direct URL copied to clipboard!');
    }
  };

  const featuredNotice = useMemo(() => {
    const firstNotice = allNotices[0];
    if (!firstNotice) return null;
    // If the event_at date/time has already passed, it is no longer featured/latest
    if (isNoticeEventPast(firstNotice)) return null;
    return firstNotice;
  }, [allNotices]);

  // Filter Notices based on Search Query (excluding featured notice already shown in hero banner)
  const filteredNotices = useMemo(() => {
    const remainingNotices = featuredNotice
      ? allNotices.filter((n) => n._id !== featuredNotice._id)
      : allNotices;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return remainingNotices;

    return remainingNotices.filter(
      (notice) =>
        notice.title?.toLowerCase().includes(query) ||
        notice.summary?.toLowerCase().includes(query) ||
        notice.category?.toLowerCase().includes(query) ||
        (notice.ref_no && notice.ref_no.toLowerCase().includes(query)) ||
        (notice.issued_by && notice.issued_by.toLowerCase().includes(query))
    );
  }, [searchQuery, allNotices, featuredNotice]);

  const handlePrintNotice = (notice: NoticeItem) => {
    const eventDate = getEventDate(notice);
    const eventTime = getEventTime(notice);
    const venue = getNoticeVenue(notice);
    const pubDate = getPublishedDate(notice);

    const eventMetaHtml =
      eventDate || eventTime || venue
        ? `<div style="background-color: rgba(254, 243, 199, 0.6); border: 1px solid rgba(245, 158, 11, 0.5); padding: 8px 14px; border-radius: 8px; margin-bottom: 18px; font-size: 11px; display: flex; flex-wrap: wrap; gap: 14px; color: #78350f;">
            ${eventDate ? `<div><strong style="color: #92400e;">Event Date:</strong> ${eventDate}</div>` : ''}
            ${eventTime ? `<div><strong style="color: #92400e;">Time:</strong> ${eventTime}</div>` : ''}
            ${venue ? `<div><strong style="color: #92400e;">Venue:</strong> ${venue}</div>` : ''}
          </div>`
        : '';

    openLetterheadPrintWindow({
      documentTitle: `Official Notice: ${notice.title} - Madhyanchal Sarbajanin`,
      template: notice.template || notice.category,
      refNo: notice.ref_no || 'MS/NOTICE/2026',
      date: pubDate,
      subject: notice.title,
      eventMetaHtml,
      body: notice.content || `<p>${notice.summary || ''}</p>`,
      signatoryName: notice.issued_by || 'General Secretary',
      signatoryOrg: 'Madhyanchal Sarbajanin',
    });
  };

  const getCategoryBadgeClass = (category?: string) => {
    switch (category) {
      case 'AGM':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300';
      case 'Jagadhatri':
        return 'bg-amber-600/15 border-amber-600/30 text-amber-800 dark:text-amber-300';
      case 'Durga':
        return 'bg-rose-500/15 border-rose-500/30 text-rose-700 dark:text-rose-300';
      case 'Meeting':
        return 'bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300';
      case 'Financial':
        return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300';
      case 'Puja':
        return 'bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-300';
      default:
        return 'bg-stone-500/15 border-stone-500/30 text-stone-700 dark:text-stone-300';
    }
  };

  return (
    <PageLayout
      title="Notices & Announcements"
      subtitle={
        isDurgaPuja
          ? 'Stay informed with official Durga Puja announcements, competition rules, committee updates, and festival schedules from Madhyanchal Sarbajanin.'
          : 'Stay informed with official Annual General Meetings (AGM), committee updates, financial statements, and public announcements from Madhyanchal Sarbajanin.'
      }
      badge={{ text: 'Official Notice Board', icon: Megaphone }}
      breadcrumbCurrent="Notices"
      scriptJsonLd={jsonLd}
    >
      <div className="space-y-4 sm:space-y-6">
        {/* ============================================================================
            1. FEATURED / PINNED AGM SPOTLIGHT HERO BANNER
           ============================================================================ */}
        {featuredNotice && (
          <AnimatedWrapper direction="up">
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-4 backdrop-blur-md transition-all duration-300 sm:rounded-3xl sm:p-7 dark:border-amber-500/20 dark:from-stone-900/90 dark:to-stone-950/80">
              <div className="space-y-3 sm:space-y-3.5">
                {/* Top Badges */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 sm:px-3 sm:text-[11px] dark:text-amber-300">
                    <Sparkles className="h-3 w-3 fill-amber-500 text-amber-500" />
                    Latest Announcement
                  </span>

                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-extrabold uppercase sm:px-2.5',
                      getCategoryBadgeClass(featuredNotice.category)
                    )}
                  >
                    {featuredNotice.category} Notice
                  </span>

                  {featuredNotice.ref_no && (
                    <span className="rounded-full border border-slate-200 bg-white/80 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600 sm:px-2.5 sm:text-[11px] dark:border-white/10 dark:bg-stone-800/80 dark:text-slate-300">
                      Ref: {featuredNotice.ref_no}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="font-paytone text-base text-slate-900 sm:text-2xl dark:text-white">
                  {featuredNotice.title}
                </h2>

                {/* Inline Key Meta Details (Event Date, Time & Venue) */}
                {(getEventDate(featuredNotice) ||
                  getEventTime(featuredNotice) ||
                  getNoticeVenue(featuredNotice)) && (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-700 sm:gap-x-5 sm:text-xs dark:text-slate-200">
                    {getEventDate(featuredNotice) && (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-amber-500" />
                        <span>
                          <strong>Event Date:</strong>{' '}
                          {getEventDate(featuredNotice)}
                        </span>
                      </span>
                    )}

                    {getEventTime(featuredNotice) && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-amber-500" />
                        <span>
                          <strong>Time:</strong> {getEventTime(featuredNotice)}
                        </span>
                      </span>
                    )}

                    {getNoticeVenue(featuredNotice) && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-amber-500" />
                        <span>
                          <strong>Venue:</strong>{' '}
                          {getNoticeVenue(featuredNotice)}
                        </span>
                      </span>
                    )}
                  </div>
                )}

                {/* Summary */}
                <p className="line-clamp-3 text-[11px] leading-relaxed text-slate-600 sm:line-clamp-none sm:text-sm dark:text-slate-300">
                  {featuredNotice.summary}
                </p>

                {/* 3 Buttons Side-by-Side Right Under Summary */}
                <div className="flex flex-wrap items-center gap-2 pt-1.5 sm:pt-2">
                  <button
                    onClick={() => handleOpenNotice(featuredNotice)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 transition-all hover:bg-amber-400 active:scale-95 sm:px-4 sm:py-2.5 sm:text-sm"
                  >
                    <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Read Notice</span>
                  </button>

                  <button
                    onClick={() => handlePrintNotice(featuredNotice)}
                    title="Print Notice"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-800 backdrop-blur-md transition-all hover:bg-slate-100 sm:px-3.5 sm:py-2.5 sm:text-sm dark:border-white/10 dark:bg-stone-800/90 dark:text-slate-200 dark:hover:bg-stone-800"
                  >
                    <Printer className="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" />
                    <span>Print</span>
                  </button>

                  <button
                    onClick={() => handleShareNotice(featuredNotice)}
                    title="Share Direct Notice Link"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-800 backdrop-blur-md transition-all hover:bg-slate-100 sm:px-3.5 sm:py-2.5 sm:text-sm dark:border-white/10 dark:bg-stone-800/90 dark:text-slate-200 dark:hover:bg-stone-800"
                  >
                    <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        )}

        {/* ============================================================================
            2. SEARCH BAR CONTROL
           ============================================================================ */}
        <AnimatedWrapper direction="up" delay={0.1}>
          <div className="relative w-full">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 z-10 h-4 w-4 -translate-y-1/2 text-amber-500" />
            <input
              type="text"
              placeholder="Search notices by title, category, ref no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-300/80 bg-white/90 py-2.5 pr-10 pl-10 text-xs text-slate-800 placeholder-slate-400 backdrop-blur-md transition-all outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 sm:text-sm dark:border-white/10 dark:bg-stone-900/90 dark:text-slate-100 dark:placeholder-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </AnimatedWrapper>

        {/* ============================================================================
            3. NOTICES GRID LIST
           ============================================================================ */}
        <AnimatedWrapper direction="up" delay={0.2}>
          {filteredNotices.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300/80 bg-white/50 py-16 text-center backdrop-blur-md dark:border-white/10 dark:bg-stone-900/40">
              <ShieldAlert className="h-10 w-10 text-amber-500/60" />
              <h3 className="mt-3 text-base font-bold text-slate-800 dark:text-slate-200">
                No matching notices found
              </h3>
              <p className="mt-1 max-w-sm text-xs text-slate-500 dark:text-slate-400">
                Try searching with a different keyword or ref number.
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 rounded-xl bg-amber-500/20 px-4 py-2 text-xs font-bold text-amber-700 hover:bg-amber-500/30 dark:text-amber-300"
                >
                  Clear Search Query
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredNotices.map((notice) => (
                <div
                  key={notice._id}
                  className="group relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white/90 px-3.5 py-2.5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/50 sm:rounded-2xl sm:p-5 dark:border-white/10 dark:bg-stone-900/80"
                >
                  <div className="space-y-1 sm:space-y-2.5">
                    {/* Top Row: Category Tag, Ref No & Published Date */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 overflow-hidden sm:gap-2">
                        <span
                          className={cn(
                            'py-0.2 inline-flex shrink-0 items-center rounded-md border px-1.5 text-[9px] font-bold uppercase sm:rounded-full sm:px-2.5 sm:py-0.5 sm:text-[10px]',
                            getCategoryBadgeClass(notice.category)
                          )}
                        >
                          {notice.category}
                        </span>
                        {notice.ref_no && (
                          <span className="truncate font-mono text-[9px] text-slate-400 sm:text-[11px] dark:text-slate-500">
                            Ref: {notice.ref_no}
                          </span>
                        )}
                      </div>

                      <span className="shrink-0 text-[10px] font-medium text-slate-500 sm:text-xs dark:text-slate-400">
                        {getPublishedDate(notice)}
                      </span>
                    </div>

                    {/* Notice Title */}
                    <h3 className="line-clamp-1 text-xs font-bold text-slate-900 transition-colors group-hover:text-amber-600 sm:line-clamp-2 sm:text-base dark:text-white dark:group-hover:text-amber-400">
                      {notice.title}
                    </h3>

                    {/* Summary */}
                    {notice.summary && (
                      <p className="line-clamp-2 text-[11px] leading-relaxed text-slate-600 sm:line-clamp-3 sm:text-xs dark:text-slate-400">
                        {notice.summary}
                      </p>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-2 flex items-center justify-between border-t border-slate-100/80 pt-1.5 sm:mt-4 sm:pt-3 dark:border-white/5">
                    <button
                      onClick={() => handleOpenNotice(notice)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 transition-colors hover:text-amber-700 sm:text-xs dark:text-amber-400 dark:hover:text-amber-300"
                    >
                      View Notice
                      <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleShareNotice(notice)}
                        title="Share Notice Link"
                        aria-label="Share Notice Link"
                        className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 sm:p-1.5 dark:hover:bg-stone-800 dark:hover:text-slate-200"
                      >
                        <Share2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </button>
                      <button
                        onClick={() => handlePrintNotice(notice)}
                        title="Print Notice"
                        aria-label="Print Notice"
                        className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 sm:p-1.5 dark:hover:bg-stone-800 dark:hover:text-slate-200"
                      >
                        <Printer className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatedWrapper>
      </div>

      {/* ============================================================================
          6. FULL NATIVE MOBILE SHEET & DESKTOP DIALOG MODAL
         ============================================================================ */}
      <NativeModal
        isOpen={Boolean(activeNoticeModal)}
        onClose={handleCloseNotice}
        variant="info"
        title={activeNoticeModal?.title || ''}
        description={
          activeNoticeModal
            ? `Published: ${getPublishedDate(activeNoticeModal)}`
            : ''
        }
        badgeIcon={
          <Megaphone className="h-6 w-6 text-amber-500 sm:h-8 sm:w-8" />
        }
        details={
          activeNoticeModal
            ? [
                ...(activeNoticeModal.ref_no
                  ? [
                      {
                        label: 'Ref No',
                        value: activeNoticeModal.ref_no,
                        copyable: true,
                      },
                    ]
                  : []),
                ...(getEventDate(activeNoticeModal) ||
                getEventTime(activeNoticeModal)
                  ? [
                      {
                        label: 'Event Date & Time',
                        value: [
                          getEventDate(activeNoticeModal),
                          getEventTime(activeNoticeModal),
                        ]
                          .filter(Boolean)
                          .join(' • '),
                      },
                    ]
                  : []),
                ...(getNoticeVenue(activeNoticeModal)
                  ? [
                      {
                        label: 'Venue',
                        value: getNoticeVenue(activeNoticeModal),
                      },
                    ]
                  : []),
                {
                  label: 'Issued By',
                  value: activeNoticeModal.issued_by || 'General Secretary',
                },
              ]
            : []
        }
        primaryButton={{
          label: 'Print',
          onClick: () =>
            activeNoticeModal && handlePrintNotice(activeNoticeModal),
          icon: <Printer className="h-3.5 w-3.5" />,
        }}
        secondaryButton={{
          label: 'Share Link',
          onClick: () =>
            activeNoticeModal && handleShareNotice(activeNoticeModal),
          icon: <Share2 className="h-3.5 w-3.5" />,
        }}
      >
        {activeNoticeModal && (
          <div className="my-2 max-h-[180px] overflow-y-auto rounded-xl border border-slate-200/90 bg-slate-50/90 p-3.5 text-left text-xs leading-relaxed text-slate-700 sm:max-h-[320px] dark:border-white/10 dark:bg-stone-900/80 dark:text-slate-200">
            {activeNoticeModal.content?.includes('<') ? (
              <div
                className="space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-200 [&_a]:font-medium [&_a]:text-amber-600 [&_a]:underline hover:[&_a]:text-amber-700 dark:[&_a]:text-amber-400 [&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-amber-500/50 [&_blockquote]:pl-3 [&_blockquote]:text-slate-600 [&_blockquote]:italic dark:[&_blockquote]:text-slate-400 [&_h1]:my-2 [&_h1]:text-base [&_h1]:font-bold [&_h2]:my-2 [&_h2]:text-sm [&_h2]:font-bold [&_h3]:my-1.5 [&_h3]:text-xs [&_h3]:font-bold [&_li]:my-0.5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-slate-900 dark:[&_strong]:text-white [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: activeNoticeModal.content }}
              />
            ) : (
              <div className="whitespace-pre-wrap">
                {activeNoticeModal.content || activeNoticeModal.summary}
              </div>
            )}
          </div>
        )}
      </NativeModal>
    </PageLayout>
  );
}
