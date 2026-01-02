import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Briefcase, Calendar, Brain } from "lucide-react";

const JDCard = ({ jd }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    } catch {
      return "Recently";
    }
  };

  // 🔹 NEW: extract top skills from NLP output
  const topSkills = jd.skills
    ? Object.values(jd.skills)
        .flat()
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 4)
    : [];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/jd/${jd._id}`)}
      className="border rounded-xl p-5 cursor-pointer
                 hover:shadow-lg hover:border-primary
                 transition-all bg-background group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {jd.companyName}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Briefcase className="h-3 w-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {jd.jobTitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 ROLE BADGE (optional but powerful) */}
      {jd.role && (
        <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-3">
          <Brain className="h-3 w-3" />
          {jd.role}
        </div>
      )}

      {/* 🔹 SKILLS SECTION (Phase-2 NLP) */}
      {topSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 mb-3">
          {topSkills.map((s) => (
            <span
              key={s.skill}
              className="text-xs px-2.5 py-1 rounded-full
                         bg-primary/10 text-primary font-medium
                         border border-primary/20"
            >
              {s.skill}
            </span>
          ))}
        </div>
      )}

      {jd.createdAt && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3 pt-3 border-t">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(jd.createdAt)}</span>
        </div>
      )}
    </motion.div>
  );
};

export default JDCard;
