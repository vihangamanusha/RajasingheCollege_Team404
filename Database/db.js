users {
  _id,
  username,
  passwordHash,
  role: "ADMIN" | "IT" | "TEACHER" | "STUDENT",
  isActive,
  createdBy,
  createdAt
}
