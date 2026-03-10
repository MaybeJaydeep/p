import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  FileText,
  TrendingUp,
  Brain,
  BarChart2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import api from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [jds, setJDs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [userRes, jdsRes] = await Promise.all([
          api.get("/auth/me"),
          api.get("/jd/my"),
        ]);
        setUser(userRes.data);
        setJDs(jdsRes.data);
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Compute stats from JDs ─────────────────────────────────────────────
  const stats = (() => {
    if (!jds.length) return null;

    // Role distribution
    const roleCounts = {};
    jds.forEach((jd) => {
      if (jd.role) roleCounts[jd.role] = (roleCounts[jd.role] || 0) + 1;
    });
    const topRole = Object.entries(roleCounts).sort((a, b) => b[1] - a[1])[0];

    // Skill frequency across all JDs
    const skillCounts = {};
    jds.forEach((jd) => {
      if (!jd.skills) return;
      Object.values(jd.skills)
        .flat()
        .forEach((s) => {
          skillCounts[s.skill] = (skillCounts[s.skill] || 0) + s.weight;
        });
    });
    const topSkills = Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    // Category distribution
    const catCounts = {};
    jds.forEach((jd) => {
      if (!jd.skills) return;
      Object.keys(jd.skills).forEach((cat) => {
        catCounts[cat] = (catCounts[cat] || 0) + 1;
      });
    });
    const topCategories = Object.entries(catCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return { roleCounts, topRole, topSkills, topCategories };
  })();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        <Skeleton className="h-10 w-48 mb-6" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* ── PAGE TITLE ─────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">Your account & placement prep overview</p>
      </motion.div>

      {/* ── USER INFO CARD ─────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.name || "—"}</h2>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                  <Mail className="h-3.5 w-3.5" />
                  {user?.email || "—"}
                </div>
                {user?.role && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full px-2.5 py-0.5 capitalize">
                      {user.role}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── STAT CARDS ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        <StatCard
          icon={<FileText className="h-5 w-5 text-primary" />}
          label="JDs Uploaded"
          value={jds.length}
        />
        <StatCard
          icon={<Brain className="h-5 w-5 text-primary" />}
          label="Most Common Role"
          value={stats?.topRole?.[0] || "—"}
          sub={stats?.topRole ? `${stats.topRole[1]} of ${jds.length} JDs` : undefined}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          label="Most In-Demand Skill"
          value={stats?.topSkills?.[0]?.[0] || "—"}
          sub={stats?.topSkills?.[0] ? `${stats.topSkills[0][1]} mentions total` : undefined}
        />
      </motion.div>

      {jds.length > 0 && stats && (
        <>
          {/* ── TOP SKILLS ─────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart2 className="h-5 w-5" />
                  Top Skills Across All Your JDs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {stats.topSkills.map(([skill, count], i) => {
                    const max = stats.topSkills[0][1];
                    const pct = Math.round((count / max) * 100);
                    return (
                      <div key={skill}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="capitalize font-medium">{skill}</span>
                          <span className="text-muted-foreground text-xs">{count}x</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ── ROLE DISTRIBUTION ──────────────────────────────────── */}
          {Object.keys(stats.roleCounts).length > 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Brain className="h-5 w-5" />
                    Role Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(stats.roleCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([role, count]) => (
                        <span
                          key={role}
                          className="inline-flex items-center gap-1.5 text-sm bg-muted border rounded-full px-3 py-1.5"
                        >
                          <span className="font-medium">{role}</span>
                          <span className="text-xs text-muted-foreground bg-background rounded-full px-1.5 py-0.5 border">
                            {count}
                          </span>
                        </span>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </>
      )}

      {jds.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-lg font-medium">No data yet</p>
          <p className="text-sm mt-1">Upload your first JD to see your stats here.</p>
        </div>
      )}
    </div>
  );
}

// ── Helper component ─────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub }) {
  return (
    <Card>
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {label}
            </p>
            <p className="text-lg font-bold mt-0.5 truncate" title={value}>
              {value}
            </p>
            {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
