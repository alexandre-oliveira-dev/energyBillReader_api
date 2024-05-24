import { describe, expect, it } from "vitest";
import axios from "axios";
import FormData from "form-data";
import { readFileSync } from "fs";
import path from "path";


const pdfPath = path.resolve(__dirname, "./3000055479-02-2023.pdf");
const httpRequest = axios.create({ baseURL: "http://localhost:5000" });
const userId = "v6eG22IuQZdwuOzAxFTzS4XKFIG3";
const file = readFileSync(pdfPath);

/* 
Iniciar a API primeiro antes de executar o teste
*/

describe("process pdf", () => {
  it("upload file and process data", async () => {
    const form = new FormData();
    form.append("file", file, "3000055479-02-2023.pdf");
    
    const result = await httpRequest.post(`/upload/${userId}`, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    expect(result.status).toBe(200); 
  });
});
