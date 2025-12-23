const JDCard = ({ jd }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 hover:shadow-lg transition">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold">
          {jd.companyName}
        </h2>
        <p className="text-sm text-gray-500">
          {jd.jobTitle}
        </p>
      </div>

      {/* Role */}
      <div className="mb-3">
        <p className="text-sm text-gray-500 mb-1">
          Identified Role
        </p>
        <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
          {jd.analysis?.role || "Not detected"}
        </span>
      </div>

      {/* Technologies */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">
          Technologies
        </p>
        <div className="flex flex-wrap gap-2">
          {jd.analysis?.technologies?.length > 0 ? (
            jd.analysis.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs"
              >
                {tech}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">
              Not detected
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {jd.analysis?.summary}
      </p>
    </div>
  );
};

export default JDCard;
