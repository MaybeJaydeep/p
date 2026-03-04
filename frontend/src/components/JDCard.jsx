import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Briefcase, Calendar, Brain, Trash2 } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const JDCard = ({ jd, onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    } catch {
      return "Recently";
    }
  };

  const topSkills = jd.skills
    ? Object.values(jd.skills)
        .flat()
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 4)
    : [];

  const handleDelete = (e) => {
    e.stopPropagation(); // don't navigate to detail
    onDelete?.(jd._id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/jd/${jd._id}`)}
      className="border rounded-xl p-5 cursor-pointer
                 hover:shadow-lg hover:border-primary
                 transition-all bg-background group relative"
    >
      {/* Delete button */}
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100
                     transition-opacity p-1.5 rounded-md
                     text-muted-foreground hover:text-red-500
                     hover:bg-red-50 dark:hover:bg-red-950/30"
          title="Delete JD"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}

      <div className="flex items-start gap-2 mb-3 pr-8">
        <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors shrink-0">
          <Building2 className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors truncate">
            {jd.companyName}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Briefcase className="h-3 w-3 text-muted-foreground shrink-0" />
            <p className="text-sm text-muted-foreground truncate">
              {jd.jobTitle}
            </p>
          </div>
        </div>
      </div>

      {jd.role && (
        <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-3">
          <Brain className="h-3 w-3" />
          {jd.role}
        </div>
      )}

      {topSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
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
