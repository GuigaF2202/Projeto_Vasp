import React from "react";

const ProgressBar = ({ progress, color = "bg-orange-500" }) => {
  // Garante que progress é um número válido entre 0 e 100
  const validProgress =
    typeof progress === "number" && progress >= 0 && progress <= 100
      ? progress
      : 0;

  return (
    <div
      className="w-full rounded-full h-2 bg-gray-300 dark:bg-gray-700"
      aria-label={`Progresso: ${validProgress}%`}
    >
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${validProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
