import { useMemo, useState } from "react";

export default function RamoCustomerPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");

  const customer = {
    firstName: "将弥",
    visitCount: 7,
    reservationCount: 8,
    memberRank: "Silver",
    nextRank: "Gold",
    nextRankVisitsNeeded: 1,
    creditScore: "A",
    creditLabel: "優良顧客",
    perks: ["乾杯ドリンク 1杯サービス", "デザート先行案内", "優先予約案内"],
  };

  const availableTimes = useMemo(() => {
    const times = [];
    for (let h = 17; h <= 22; h++) {
      for (let m = 0; m < 60; m += 15) {
        if (h === 22 && m > 0) break;
        times.push(
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
        );
      }
    }
    return times;
  }, []);

  const getRankStyle = (rank) => {
    switch (rank) {
      case "Bronze":
        return {
          background: "linear-gradient(135deg, #D6A273, #9A5A2E)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 1px 0 rgba(255,255,255,0.15)",
        };
      case "Silver":
        return {
          background: "linear-gradient(135deg, #FFFFFF, #F3F4F6, #D1D5DB)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 1px 0 rgba(255,255,255,0.22)",
        };
      case "Gold":
        return {
          background: "linear-gradient(135deg, #FFF7CC, #FACC15, #B7791F)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 1px 0 rgba(255,255,255,0.18)",
        };
      case "Platinum":
        return {
          background: "linear-gradient(135deg, #F5F3FF, #C4B5FD, #7C3AED)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 1px 0 rgba(255,255,255,0.18)",
        };
      default:
        return {
          color: "#E5E7EB",
        };
    }
  };

  const handleReservationRequest = () => {
    if (!fullName || !phone || !date || !time || !guests) {
      alert("未入力の項目があります");
      return;
    }

    const newReservation = {
      id: Date.now(),
      name: fullName,
      phone,
      date,
      time,
      guests: Number(guests),
      visitCount: 0,
      cancelCount: 0,
      noShowCount: 0,
      note: "新規予約",
      status: "pending",
      rank: "Bronze",
      creditScore: "B",
    };

    const existingReservations = JSON.parse(
      localStorage.getItem("ramoReservations") || "[]"
    );

    localStorage.setItem(
      "ramoReservations",
      JSON.stringify([newReservation, ...existingReservations])
    );

    const message =
      `【Ramo予約申請】\n` +
      `お名前：${fullName}\n` +
      `電話番号：${phone}\n` +
      `希望日：${date}\n` +
      `希望時間：${time}\n` +
      `人数：${guests}名\n` +
      `特典対象：はい`;

    window.location.href = `https://line.me/R/oaMessage/@728krjwb/?${encodeURIComponent(
      message
    )}`;
  };

  return (
    <div style={{ background: "#F7FBFB", minHeight: "100vh" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", background: "#fff" }}>
        <div
          style={{
            background: "linear-gradient(135deg,#2F6E3F,#8FD19E)",
            padding: "28px",
            borderBottomLeftRadius: "32px",
            borderBottomRightRadius: "32px",
            color: "#fff",
            boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 800,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              R
            </div>

            <div>
              <div style={{ fontSize: "12px", letterSpacing: "0.2em" }}>
                RANKA
              </div>
              <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.94)" }}>
                通うほど、価値が上がる。
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "34px",
              fontSize: "16px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            for Ramo
          </div>

          <h1
            style={{
              margin: "14px 0 18px",
              fontSize: "34px",
              lineHeight: 1.2,
              letterSpacing: "-0.04em",
              fontWeight: 800,
            }}
          >
            ご予約ありがとうございます
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            {customer.firstName}さまは現在{" "}
            <span style={{ fontWeight: 800 }}>
              RANKA {customer.memberRank} Member
            </span>{" "}
            です。安定してご利用いただいているお客様として、今回のご予約でも特典対象になっています。
          </p>

          <div
            style={{
              marginTop: "28px",
              borderRadius: "28px",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.10)",
              padding: "26px",
              backdropFilter: "blur(4px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "18px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.82)",
                    marginBottom: "10px",
                  }}
                >
                  RANKA Member Rank
                </div>

                <div
                  style={{
                    fontSize: "42px",
                    fontWeight: 800,
                    lineHeight: 1,
                    marginBottom: "12px",
                    ...getRankStyle(customer.memberRank),
                  }}
                >
                  {customer.memberRank}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.95)",
                    marginBottom: "10px",
                  }}
                >
                  あと{customer.nextRankVisitsNeeded}回来店で {customer.nextRank}
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "999px",
                    padding: "8px 12px",
                    background: "rgba(255,255,255,0.16)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  会員ランクは Bronze / Silver / Gold / Platinum の4段階
                </div>
              </div>

              <div
                style={{
                  minWidth: "140px",
                  height: "140px",
                  borderRadius: "28px",
                  background: "rgba(255,255,255,0.14)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "12px",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.82)",
                    marginBottom: "8px",
                  }}
                >
                  信用スコア
                </div>
                <div
                  style={{
                    fontSize: "36px",
                    lineHeight: 1,
                    fontWeight: 800,
                    color: "#ffffff",
                  }}
                >
                  {customer.creditScore}
                </div>
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {customer.creditLabel}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div
                style={{
                  borderRadius: "24px",
                  background: "rgba(255,255,255,0.14)",
                  padding: "18px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.82)",
                    marginBottom: "8px",
                  }}
                >
                  予約回数
                </div>
                <div style={{ fontSize: "28px", fontWeight: 800 }}>
                  {customer.reservationCount}
                </div>
              </div>

              <div
                style={{
                  borderRadius: "24px",
                  background: "rgba(255,255,255,0.14)",
                  padding: "18px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.82)",
                    marginBottom: "8px",
                  }}
                >
                  来店回数
                </div>
                <div style={{ fontSize: "28px", fontWeight: 800 }}>
                  {customer.visitCount}
                </div>
              </div>
            </div>
          </div>
        </div>

        <main style={{ padding: "22px 22px 34px" }}>
          <section
            style={{
              borderRadius: "28px",
              border: "1px solid #E5E7EB",
              background: "#ffffff",
              padding: "24px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                今回の特典
              </h2>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "999px",
                  background: "#DCFCE7",
                  color: "#166534",
                  padding: "10px 18px",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                利用可能
              </span>
            </div>

            <div style={{ marginTop: "18px", display: "grid", gap: "14px" }}>
              {customer.perks.map((perk) => (
                <div
                  key={perk}
                  style={{
                    borderRadius: "22px",
                    border: "1px solid #BBF7D0",
                    background: "#F0FDF4",
                    padding: "16px 18px",
                    fontSize: "16px",
                    color: "#374151",
                  }}
                >
                  {perk}
                </div>
              ))}
            </div>
          </section>

          <section
            style={{
              borderRadius: "28px",
              border: "1px solid #D1D5DB",
              background: "#ffffff",
              padding: "24px",
            }}
          >
            <h2
              style={{
                margin: "0 0 24px",
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#111827",
              }}
            >
              予約情報の入力
            </h2>

            <div style={{ display: "grid", gap: "20px" }}>
              <Field label="フルネーム">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="山本 将弥"
                  style={inputStyle}
                />
              </Field>

              <Field label="電話番号">
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="09012345678"
                  style={inputStyle}
                />
              </Field>

              <Field label="希望日">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={inputStyle}
                />
              </Field>

              <Field label="希望時間">
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">選択してください</option>
                  {availableTimes.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="人数">
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">選択してください</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n}名
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <button onClick={handleReservationRequest} style={buttonStyle}>
              予約をリクエストする
            </button>

            <p
              style={{
                margin: "16px 0 0",
                fontSize: "14px",
                lineHeight: 1.8,
                color: "#6B7280",
              }}
            >
              予約内容はLINEで店舗に送信されます。担当者が内容確認後にご連絡します。
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "10px",
          fontSize: "16px",
          fontWeight: 800,
          color: "#374151",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  borderRadius: "18px",
  border: "1px solid #D1D5DB",
  padding: "16px 16px",
  fontSize: "16px",
  color: "#111827",
  background: "#ffffff",
  boxSizing: "border-box",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  marginTop: "24px",
  border: "none",
  borderRadius: "18px",
  padding: "18px 18px",
  background: "#4FA653",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: 800,
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
};