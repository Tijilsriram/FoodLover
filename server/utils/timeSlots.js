function generateSlots(day) {
  const slots = [];

  const endHour = day === 0 ? 23 : 22;
  const endMinute = day === 0 ? 30 : 0;

  let hour = 10;
  let minute = 0;

  while (
    hour < endHour ||
    (hour === endHour && minute <= endMinute)
  ) {
    slots.push(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    );

    minute += 30;

    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  return slots;
}

module.exports = generateSlots;