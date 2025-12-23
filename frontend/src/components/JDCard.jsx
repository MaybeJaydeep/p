import { useNavigate } from "react-router-dom";

const JDCard = ({ jd }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/jd/${jd._id}`)}
      className="border rounded-xl p-5 cursor-pointer
                 hover:shadow-md hover:border-primary
                 transition bg-background"
    >
      <h3 className="text-lg font-semibold">
        {jd.companyName}
      </h3>

      <p className="text-sm text-muted-foreground mt-1">
        {jd.jobTitle}
      </p>

      {jd.technologies && jd.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {jd.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-full bg-primary/10"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default JDCard;
