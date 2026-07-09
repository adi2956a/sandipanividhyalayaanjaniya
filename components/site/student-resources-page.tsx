"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PreviousYearPaperItem, ResourceStream, StudentResourceItem } from "@/lib/types";

const classOptions = [9, 10, 11, 12];
const streamOptions: ResourceStream[] = ["science", "commerce", "arts"];

function formatExamType(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function StudentResourcesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedClass = searchParams.get("class") ?? "";
  const selectedStream = searchParams.get("stream") ?? "";
  const selectedSubject = searchParams.get("subject") ?? "";
  const selectedYear = searchParams.get("year") ?? "";

  const [resources, setResources] = useState<StudentResourceItem[]>([]);
  const [papers, setPapers] = useState<PreviousYearPaperItem[]>([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [loadingPapers, setLoadingPapers] = useState(false);

  const subjectOptions = useMemo(() => {
    const subjects = new Set(resources.map((resource) => resource.subject));
    return Array.from(subjects).sort((left, right) => left.localeCompare(right));
  }, [resources]);

  const visibleResources = useMemo(
    () => resources.filter((resource) => (selectedSubject ? resource.subject === selectedSubject : true)),
    [resources, selectedSubject]
  );

  const yearOptions = useMemo(() => {
    const years = new Set(papers.map((paper) => paper.year));
    return Array.from(years).sort((left, right) => right - left);
  }, [papers]);

  const visiblePapers = useMemo(
    () => papers.filter((paper) => (selectedYear ? String(paper.year) === selectedYear : true)),
    [papers, selectedYear]
  );

  function updateParams(next: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    const query = params.toString();
    router.replace(query ? `/student-resources?${query}` : "/student-resources");
  }

  useEffect(() => {
    if (!selectedClass) return;

    const url = new URLSearchParams({ class: selectedClass });
    if (selectedStream) url.set("stream", selectedStream);

    setLoadingResources(true);
    setLoadingPapers(true);

    void fetch(`/api/student-resources?${url.toString()}`, { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setResources(Array.isArray(data) ? data : []))
      .finally(() => setLoadingResources(false));

    void fetch(`/api/previous-papers?${url.toString()}`, { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setPapers(Array.isArray(data) ? data : []))
      .finally(() => setLoadingPapers(false));
  }, [selectedClass, selectedStream]);

  useEffect(() => {
    if (!subjectOptions.length || selectedSubject) return;
    updateParams({ subject: subjectOptions[0] });
  }, [selectedSubject, subjectOptions]);

  useEffect(() => {
    if (!yearOptions.length || selectedYear) return;
    updateParams({ year: String(yearOptions[0]) });
  }, [selectedYear, yearOptions]);

  return (
    <div className="grid gap-8">
      <section className="rounded-[2rem] border border-border bg-gradient-to-br from-white via-surface to-white p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Class Selection</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {classOptions.map((classValue) => (
            <button
              key={classValue}
              className={`rounded-full px-5 py-3 font-semibold transition ${
                selectedClass === String(classValue) ? "bg-primary text-white" : "border border-border bg-white text-primary"
              }`}
              type="button"
              onClick={() =>
                updateParams({
                  class: String(classValue),
                  stream: classValue >= 11 ? selectedStream : "",
                  subject: "",
                  year: ""
                })
              }
            >
              Class {classValue}
            </button>
          ))}
        </div>

        {selectedClass === "11" || selectedClass === "12" ? (
          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Stream</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {streamOptions.map((stream) => (
                <button
                  key={stream}
                  className={`rounded-full px-5 py-3 font-semibold transition ${
                    selectedStream === stream ? "bg-accent text-white" : "border border-border bg-white text-primary"
                  }`}
                  type="button"
                  onClick={() => updateParams({ stream, subject: "", year: "" })}
                >
                  {stream[0].toUpperCase() + stream.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {!selectedClass ? (
        <div className="rounded-[2rem] border border-dashed border-border bg-white p-8 text-muted">
          Select a class to load subject-wise study resources and previous year papers.
        </div>
      ) : null}

      {selectedClass && (selectedClass === "9" || selectedClass === "10" || selectedStream) ? (
        <>
          <section className="rounded-[2rem] border border-border bg-white p-6 shadow-card">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Subjects</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-primary">Chapter-wise Study Material</h2>
              </div>
            </div>

            {loadingResources ? <p className="mt-5 text-sm text-muted">Loading chapters...</p> : null}
            {!loadingResources && !subjectOptions.length ? <p className="mt-5 text-sm text-muted">No subjects available for this selection yet.</p> : null}

            {subjectOptions.length ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {subjectOptions.map((subject) => (
                  <button
                    key={subject}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      selectedSubject === subject ? "bg-primary text-white" : "border border-border bg-surface text-primary"
                    }`}
                    type="button"
                    onClick={() => updateParams({ subject })}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="mt-6 grid gap-4">
              {visibleResources.map((resource) => (
                <details key={resource._id ?? `${resource.subject}-${resource.chapter}`} className="rounded-3xl border border-border bg-surface/50 p-5">
                  <summary className="cursor-pointer list-none font-heading text-lg font-semibold text-primary">{resource.chapter}</summary>
                  <div className="mt-4 grid gap-5 lg:grid-cols-2">
                    {resource.youtubeLinks.map((video) => (
                      <div key={`${resource._id}-${video.youtubeId}-${video.title}`} className="overflow-hidden rounded-3xl border border-border bg-white">
                        <iframe
                          allowFullScreen
                          className="aspect-video w-full"
                          src={`https://www.youtube.com/embed/${video.youtubeId}`}
                          title={video.title}
                        />
                        <div className="p-4">
                          <p className="font-medium text-ink">{video.title || "Video Lesson"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {resource.notesPdfUrl ? (
                    <a
                      className="mt-5 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
                      href={resource.notesPdfUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Download Notes PDF
                    </a>
                  ) : null}
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-border bg-white p-6 shadow-card">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Exam Archive</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-primary">Previous Year Papers</h2>
              </div>
              {yearOptions.length ? (
                <select
                  className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm"
                  value={selectedYear}
                  onChange={(event) => updateParams({ year: event.target.value })}
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>

            {loadingPapers ? <p className="mt-5 text-sm text-muted">Loading papers...</p> : null}
            {!loadingPapers && !visiblePapers.length ? <p className="mt-5 text-sm text-muted">No previous papers found yet.</p> : null}

            <div className="mt-5 grid gap-4">
              {visiblePapers
                .filter((paper) => (selectedSubject ? paper.subject === selectedSubject : true))
                .map((paper) => (
                  <a
                    key={paper._id ?? `${paper.subject}-${paper.year}-${paper.examType}`}
                    className="flex flex-col gap-2 rounded-3xl border border-border bg-surface/60 p-5 transition hover:border-primary"
                    href={paper.fileUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                        {paper.subject}
                      </span>
                      <span className="text-sm text-muted">{paper.year}</span>
                    </div>
                    <p className="font-heading text-lg font-semibold text-ink">{formatExamType(paper.examType)}</p>
                    <p className="text-sm text-muted">Open PDF link</p>
                  </a>
                ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
