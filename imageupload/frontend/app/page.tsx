"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const Page = () => {
  const [doctype, setDoctype] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSelect = () => {
    fileRef.current.click();
  };

  const handleUpload = async () => {
    if (file && doctype) {
      const formData = new FormData();
      formData.append("file", file, `${doctype}_${file.name}`);
      try {
        const response = await axios.post(
          "http://localhost:8000/upload",
          formData
        );
        console.log(response);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file selected or document type provided");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center h-screen p-5">
      <div className="bg-white border h-full mx-auto p-5 rounded-lg w-10/12">
        <div className="flex gap-5">
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
          <Input
            placeholder="Document Type"
            value={doctype}
            onChange={(e) => setDoctype(e.target.value)}
            onClick={handleSelect}
          />
          <Button onClick={handleUpload} disabled={!file || !doctype}>
            Upload
          </Button>
        </div>
        <div className="my-3">Selected File</div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-black">{}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
