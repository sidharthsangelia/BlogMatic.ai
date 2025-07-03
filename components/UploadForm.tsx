import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function UploadForm() {
  return (
    <form action="v" className="flex flex-col gap-6">
      <div className="flex items-center justify-end gap-1.5">
        <Input id="file" name="file" type="file" accept="audio/*,video/*" required/>
        <Button className="ng-purple-600">Transcribe</Button>
      </div>
    </form>
  );
}
