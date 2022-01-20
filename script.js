const buttons = document.querySelectorAll(".btn");
const hoursEl = document.querySelectorAll(".hours");
const prevHoursEl = document.querySelectorAll(".hours__previous");

const getData = async function (reportType) {
  const data = await fetch("data.json").then((res) => res.json());
  const info = { ...data };

  hoursEl.forEach((el, idx) => {
    if (reportType === "weekly") {
      info[idx].timeframes.weekly.current === 1
        ? (el.innerHTML = `${info[idx].timeframes.weekly.current} hr`)
        : (el.innerHTML = `${info[idx].timeframes.weekly.current} hrs`);
    } else if (reportType === "daily") {
      info[idx].timeframes.daily.current === 1
        ? (el.innerHTML = `${info[idx].timeframes.daily.current} hr`)
        : (el.innerHTML = `${info[idx].timeframes.daily.current} hrs`);
    } else if (reportType === "monthly") {
      info[idx].timeframes.monthly.current === 1
        ? (el.innerHTML = `${info[idx].timeframes.monthly.current} hr`)
        : (el.innerHTML = `${info[idx].timeframes.monthly.current} hrs`);
    }
  });
  prevHoursEl.forEach((el, idx) => {
    reportType === "weekly"
      ? info[idx].timeframes.weekly.previous === 1
        ? (el.innerHTML = `Last week - ${info[idx].timeframes.weekly.previous} hr`)
        : (el.innerHTML = `Last week - ${info[idx].timeframes.weekly.previous} hrs`)
      : reportType === "daily"
      ? info[idx].timeframes.daily.previous === 1
        ? (el.innerHTML = `Yesterday - ${info[idx].timeframes.daily.previous} hr`)
        : (el.innerHTML = `Yesterday - ${info[idx].timeframes.daily.previous} hrs`)
      : info[idx].timeframes.monthly.previous === 1
      ? (el.innerHTML = `Last month - ${info[idx].timeframes.monthly.previous} hr`)
      : (el.innerHTML = `Last month - ${info[idx].timeframes.monthly.previous} hrs`);

    // if (reportType === "weekly") {
    //   info[idx].timeframes.weekly.previous === 1
    //     ? (el.innerHTML = `Last week - ${info[idx].timeframes.weekly.previous} hr`)
    //     : (el.innerHTML = `Last week - ${info[idx].timeframes.weekly.previous} hrs`);
    // } else if (reportType === "daily") {
    //   info[idx].timeframes.daily.previous === 1
    //     ? (el.innerHTML = `Yesterday - ${info[idx].timeframes.daily.previous} hr`)
    //     : (el.innerHTML = `Yesterday - ${info[idx].timeframes.daily.previous} hrs`);
    // } else if (reportType === "monthly") {
    //   info[idx].timeframes.monthly.previous === 1
    //     ? (el.innerHTML = `Last month - ${info[idx].timeframes.monthly.previous} hr`)
    //     : (el.innerHTML = `Last month - ${info[idx].timeframes.monthly.previous} hrs`);
    // }
  });
};
const removeClass = () =>
  buttons.forEach((btn) => btn.classList.remove("active"));
const lottieAnim = () => {
  hoursEl.forEach(
    (el) =>
      (el.innerHTML = `<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_jlrxxylp.json"  background="transparent"  speed="1.1"  style="width: 100px; height: 50px;"  loop autoplay></lottie-player>`)
  );
  prevHoursEl.forEach((el) => (el.innerHTML = ""));
};
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeClass();
    e.target.classList.add("active");
    lottieAnim();
    setTimeout(() => {
      getData(e.target.innerHTML.toLowerCase());
    }, 3500);
  });
});
