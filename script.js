const buttons = document.querySelectorAll(".btn");
const hoursEl = document.querySelectorAll(".hours");
const prevHoursEl = document.querySelectorAll(".hours__previous");

const getData = async function (reportType) {
  const data = await fetch("data.json").then((res) => res.json());
  const info = { ...data };

  hoursEl.forEach((el, idx) => {
    if (reportType === "weekly") {
      info[idx].timeframes.weekly.current === 1
        ? (el.textContent = `${info[idx].timeframes.weekly.current} hr`)
        : (el.textContent = `${info[idx].timeframes.weekly.current} hrs`);
    } else if (reportType === "daily") {
      info[idx].timeframes.daily.current === 1
        ? (el.textContent = `${info[idx].timeframes.daily.current} hr`)
        : (el.textContent = `${info[idx].timeframes.daily.current} hrs`);
    } else if (reportType === "monthly") {
      info[idx].timeframes.monthly.current === 1
        ? (el.textContent = `${info[idx].timeframes.monthly.current} hr`)
        : (el.textContent = `${info[idx].timeframes.monthly.current} hrs`);
    }
  });
  prevHoursEl.forEach((el, idx) => {
    reportType === "weekly"
      ? info[idx].timeframes.weekly.previous === 1
        ? (el.textContent = `Last week - ${info[idx].timeframes.weekly.previous} hr`)
        : (el.textContent = `Last week - ${info[idx].timeframes.weekly.previous} hrs`)
      : reportType === "daily"
      ? info[idx].timeframes.daily.previous === 1
        ? (el.textContent = `Yesterday - ${info[idx].timeframes.daily.previous} hr`)
        : (el.textContent = `Yesterday - ${info[idx].timeframes.daily.previous} hrs`)
      : info[idx].timeframes.monthly.previous === 1
      ? (el.textContent = `Last month - ${info[idx].timeframes.monthly.previous} hr`)
      : (el.textContent = `Last month - ${info[idx].timeframes.monthly.previous} hrs`);

    // if (reportType === "weekly") {
    //   info[idx].timeframes.weekly.previous === 1
    //     ? (el.textContent = `Last week - ${info[idx].timeframes.weekly.previous} hr`)
    //     : (el.textContent = `Last week - ${info[idx].timeframes.weekly.previous} hrs`);
    // } else if (reportType === "daily") {
    //   info[idx].timeframes.daily.previous === 1
    //     ? (el.textContent = `Yesterday - ${info[idx].timeframes.daily.previous} hr`)
    //     : (el.textContent = `Yesterday - ${info[idx].timeframes.daily.previous} hrs`);
    // } else if (reportType === "monthly") {
    //   info[idx].timeframes.monthly.previous === 1
    //     ? (el.textContent = `Last month - ${info[idx].timeframes.monthly.previous} hr`)
    //     : (el.textContent = `Last month - ${info[idx].timeframes.monthly.previous} hrs`);
    // }
  });
};
const removeClass = () =>
  buttons.forEach((btn) => btn.classList.remove("active"));

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeClass();
    e.target.classList.add("active");
    getData(e.target.textContent.toLowerCase());
  });
});
