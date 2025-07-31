export const useConvertGMTtoLocalTime = () => {
  //Take arguments country wise and return the local time

  const userTime = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(new Date(Date.now()));

  return userTime;
};
