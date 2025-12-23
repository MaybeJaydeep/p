import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const JDCard = ({ jd }) => {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="text-lg">
          {jd.companyName}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {jd.jobTitle}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Role */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Role
          </span>
          <Badge variant="secondary">
            {jd.analysis?.role || "Not detected"}
          </Badge>
        </div>

        {/* Technologies */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Technologies
          </p>

          <div className="flex flex-wrap gap-2">
            {jd.analysis?.technologies?.length > 0 ? (
              jd.analysis.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                Not detected
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {jd.analysis?.summary}
        </p>
      </CardContent>
    </Card>
  );
};

export default JDCard;
