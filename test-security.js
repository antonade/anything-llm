const path = require("path");
// Replace '.' with the actual path to your normalizePath function
const { normalizePath } = require("."); 

const payloads = [
  "../../../../etc/passwd",                // Standard traversal
  "..\\..\\..\\windows\\system32\\config", // Windows traversal
  "foo/../../bar",                         // Mid-string traversal
  "C:/Windows/System32/drivers/etc/hosts", // Absolute path (Windows)
  "/etc/shadow",                           // Absolute path (Unix)
  "..%2f..%2f..%2fetc%2fpasswd",           // URL Encoded
  "....//....//etc/passwd"                 // Nested/Double separators
];

console.log("--- Security Test: normalizePath ---\n");

payloads.forEach((payload) => {
  const normalized = normalizePath(payload);
  const isVulnerable = normalized.includes("/") || normalized.includes("\\");
  
  console.log(`Input:  ${payload}`);
  console.log(`Output: ${normalized}`);
  console.log(`Status: ${isVulnerable ? "❌ VULNERABLE" : "✅ SECURE"}`);
  console.log("-----------------------------------\n");
});
