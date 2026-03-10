import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Briefcase,
  Code,
  FileText,
  AlertCircle,
  ExternalLink,
  Globe,
  ListChecks,
  StickyNote,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";
import api from "@/services/api";
import Roadmap from "@/components/Roadmap";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { INTERVIEW_TIPS } from "@/data/interviewTips";

export default function JDDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error: showError, success: showSuccess } = useToast();

  const [jd, setJD] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Notes (localStorage per JD) ─────────────────────────────────────────
  const [notes, setNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);
  const notesTimer = useRef(null);

  // ── Interview tips expand ─────────────────────────────────────────────
  const [tipsExpanded, setTipsExpanded] = useState(false);

  useEffect(() => {
    const fetchJD = async () => {
      try {
        const res = await api.get(`/jd/${id}`);
        setJD(res.data);
        // Load persisted notes
        const saved = localStorage.getItem(`jd_notes_${id}`) || "";
        setNotes(saved);
      } catch (err) {
        setError("Failed to load job description");
        showError("Failed to load job description. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJD();
  }, [id, showError]);

  // Auto-save notes with debounce
  const handleNotesChange = (e) => {
    const val = e.target.value;
    setNotes(val);
    setNotesSaved(false);
    clearTimeout(notesTimer.current);
    notesTimer.current = setTimeout(() => {
      localStorage.setItem(`jd_notes_${id}`, val);
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
    }, 800);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Skeleton className="h-40 w-full rounded-xl" />
        <Card>
          <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !jd) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Job Description Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The job description you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/")}>Go to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const role = jd.analysis?.role;
  const skillsByCategory = jd.analysis?.skills || {};
  const roadmap = jd.analysis?.roadmap || [];
  const summary = jd.analysis?.summary;
  const companyInfo = jd.companyInfo;
  const hasCompanyInfo =
    companyInfo?.source === "wikipedia" &&
    (companyInfo?.summary || companyInfo?.description);

  // Use tips from DB (stored at upload time) or fall back to local file
  const interviewTips =
    jd.analysis?.interviewTips || (role ? INTERVIEW_TIPS[role] : null);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="shrink-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-1"
          >
            <Building2 className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">{jd.companyName}</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Briefcase className="h-4 w-4" />
            <p>{jd.jobTitle}</p>
          </motion.div>
        </div>
      </div>

      {/* ── COMPANY OVERVIEW (Wikipedia) ─────────────────────────────── */}
      {hasCompanyInfo ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Globe className="h-4 w-4 text-primary" />
                Company Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {companyInfo.thumbnail && (
                  <div className="shrink-0">
                    <img
                      src={companyInfo.thumbnail}
                      alt={`${jd.companyName} logo`}
                      className="w-20 h-20 object-contain rounded-lg border bg-white p-1"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {companyInfo.description && (
                    <span className="inline-block text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 mb-2">
                      {companyInfo.description}
                    </span>
                  )}
                  {companyInfo.summary && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                      {companyInfo.summary}
                    </p>
                  )}
                  {companyInfo.wikiUrl && (
                    <a
                      href={companyInfo.wikiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-3"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View on Wikipedia
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        companyInfo?.source === "fallback" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="border-dashed">
              <CardContent className="py-4 flex items-center gap-3 text-muted-foreground">
                <Globe className="h-4 w-4 shrink-0" />
                <p className="text-sm">
                  No public information found for <strong>{jd.companyName}</strong>. This may be a private or lesser-known company.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )
      )}

      {/* ── IDENTIFIED ROLE ──────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Identified Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{role || "Not detected"}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── SKILLS ───────────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Required Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.keys(skillsByCategory).length > 0 ? (
              Object.entries(skillsByCategory).map(([category, skills]) =>
                skills.length > 0 ? (
                  <div key={category}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      {category.replace("_", " ")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s) => (
                        <span
                          key={s.skill}
                          className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium border border-primary/20"
                          title={`Mentioned ${s.weight}x in the JD`}
                        >
                          {s.skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null
              )
            ) : (
              <p className="text-muted-foreground">No skills detected</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── JD SUMMARY ───────────────────────────────────────────────── */}
      {summary && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                JD Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{summary}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ── INTERVIEW TIPS ───────────────────────────────────────────── */}
      {interviewTips && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <Card>
            <button
              onClick={() => setTipsExpanded((v) => !v)}
              className="w-full text-left"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5" />
                    Interview Prep
                  </span>
                  {tipsExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardTitle>
              </CardHeader>
            </button>

            {tipsExpanded && (
              <CardContent className="space-y-5 pt-0">
                {/* Interview rounds */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Typical Interview Rounds
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {interviewTips.rounds.map((round, i) => (
                      <span
                        key={round}
                        className="inline-flex items-center gap-1.5 text-sm font-medium bg-muted px-3 py-1.5 rounded-full border"
                      >
                        <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        {round}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prep tips */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Key Preparation Tips
                  </p>
                  <ul className="space-y-2">
                    {interviewTips.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            )}
          </Card>
        </motion.div>
      )}

      {/* ── PREPARATION ROADMAP ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Preparation Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Roadmap roadmap={roadmap} jdId={id} />
          </CardContent>
        </Card>
      </motion.div>

      {/* ── NOTES ────────────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <StickyNote className="h-5 w-5" />
                My Notes
              </span>
              {notesSaved && (
                <span className="text-xs text-primary font-normal flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Saved
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Jot down anything — things you want to research, interview questions you've been asked, personal thoughts…"
              className="w-full min-h-[140px] resize-y rounded-lg border bg-muted/30 px-4 py-3 text-sm
                         placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2
                         focus:ring-primary/40 focus:border-primary transition-colors"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Notes are saved automatically to your browser.
            </p>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}
