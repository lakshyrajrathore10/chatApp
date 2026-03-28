const formatTime = (isoTimestamp) => {
  const date = new Date(isoTimestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default formatTime;
