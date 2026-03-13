import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { EmptyMembers } from "./empty-members";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";

export default function ProjectMembers({ members }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {members.length === 0 ? (
          <EmptyMembers />
        ) : (
          members.map((member: any) => (
            <div
              key={member.id}
              className="flex items-center gap-3 border p-2 rounded"
            >
              <Avatar>
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>

              <p>{member.name}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
