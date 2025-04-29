import moment from "moment";
import "moment/locale/vi";
import "moment-lunar";

export function formatLunarDate(dateStr) {
  const date = moment(dateStr, "DD/MM/YYYY");

  date.locale("vi");

  const lunar = date.lunar(); // moment-lunar

  const solarFormatted = date.format("dddd, [ngày] DD [tháng] MM [năm] YYYY");

  const lunarFormatted = `ngày ${String(lunar.date()).padStart(
    2,
    "0"
  )} tháng ${String(lunar.month() + 1).padStart(2, "0")}`;

  return (
    <>
      {solarFormatted.charAt(0).toUpperCase()}
      {solarFormatted.slice(1)}
      <br />
      (tức {lunarFormatted} âm lịch)
    </>
  );
}
