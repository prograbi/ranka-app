import { useMemo, useState } from "react";

export default function RamoStaffPage() {
  const [filter, setFilter] = useState("all");
  const [reservations, setReservations] = useState(() => {
    const data = localStorage.getItem("ramoReservations");
    return data ? JSON.parse(data) : [];
  });

  const calculateScore = (r) => {
    let score = 0;

    score += r.visitCount * 10;
    score -= r.cancelCount * 20;
    score -= r.noShowCount * 50;

    return score;
  };

  const getRankFromScore = (score) => {
    if (score >= 120) return "Gold";
    if (score >= 50) return "Silver";
    return "Bronze";
  };

  const filteredReservations = useMemo(() => {
    if (filter === "all") return reservations;
    return reservations.filter((item) => item.status === filter);
  }, [filter, reservations]);

  const updateReservation = (id, type) => {
    const updated = reservations.map((item) => {
      if (item.id !== id) return item;
  
      if (type === "visited") {
        const newVisit = item.visitCount + 1;
      
        const updatedItem = {
          ...item,
          status: "visited",
          visitCount: newVisit,
        };
      
        const score = calculateScore(updatedItem);
        const rank = getRankFromScore(score);
      
        return {
          ...updatedItem,
          rank,
        };
      }
  
      if (type === "cancelled") {
        const newCancel = item.cancelCount + 1;
      
        const updatedItem = {
          ...item,
          status: "cancelled",
          cancelCount: newCancel,
        };
      
        const score = calculateScore(updatedItem);
        const rank = getRankFromScore(score);
      
        return {
          ...updatedItem,
          rank,
        };
      }
  
      if (type === "no_show") {
        const newNoShow = item.noShowCount + 1;
      
        const updatedItem = {
          ...item,
          status: "no_show",
          noShowCount: newNoShow,
        };
      
        const score = calculateScore(updatedItem);
        const rank = getRankFromScore(score);
      
        return {
          ...updatedItem,
          rank,
        };
      }
  
      return item;
    });
  
    setReservations(updated);
    localStorage.setItem("ramoReservations", JSON.stringify(updated));
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case "Gold":
        return "#ca8a04";
      case "Silver":
        return "#64748b";
      case "Bronze":
        return "#92400e";
      default:
        return "#374151";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "visited":
        return "来店済";
      case "cancelled":
        return "キャンセル";
      case "no_show":
        return "無断キャンセル";
      default:
        return "未対応";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "visited":
        return "#dcfce7";
      case "cancelled":
        return "#fef3c7";
      case "no_show":
        return "#fee2e2";
      default:
        return "#f3f4f6";
    }
  };

  const getRankBadgeBg = (rank) => {
    switch (rank) {
      case "Gold":
        return "#fef3c7";
      case "Silver":
        return "#e5e7eb";
      case "Bronze":
        return "#f5e1d6";
      default:
        return "#e5e7eb";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "24px",
        fontFamily: "sans-serif",
        color: "#111827",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6b7280",
            }}
          >
            RANKA for Ramo
          </p>
          <h1 style={{ margin: "10px 0 8px", fontSize: "28px" }}>
            本日の予約一覧
          </h1>
          <p style={{ margin: 0, color: "#6b7280" }}>
            スタッフが来店結果を1タップで記録する画面です。
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "18px",
            }}
          >
            {[
              { key: "all", label: "すべて" },
              { key: "pending", label: "未対応" },
              { key: "visited", label: "来店済" },
              { key: "cancelled", label: "キャンセル" },
              { key: "no_show", label: "無断キャンセル" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                style={{
                  border: "none",
                  borderRadius: "999px",
                  padding: "10px 16px",
                  cursor: "pointer",
                  fontWeight: 700,
                  background: filter === item.key ? "#16a34a" : "#e5e7eb",
                  color: filter === item.key ? "#ffffff" : "#111827",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          {filteredReservations.map((item) => {
            const score = calculateScore(item);
            const rank = getRankFromScore(score);

            return (
              <div
                key={item.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  padding: "20px",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2 style={{ margin: 0, fontSize: "22px" }}>{item.name}</h2>
                    <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
                      {item.date} / {item.time} / {item.guests}名
                    </p>
                    <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
                      {item.phone}
                    </p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "8px 14px",
                        borderRadius: "999px",
                        background: getRankBadgeBg(rank),
                        color: getRankColor(rank),
                        fontWeight: 700,
                      }}
                    >
                      {rank}
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                        display: "inline-block",
                        padding: "8px 14px",
                        borderRadius: "999px",
                        background: getStatusBg(item.status),
                        color: "#111827",
                        fontWeight: 700,
                      }}
                    >
                      {getStatusLabel(item.status)}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                    gap: "12px",
                    marginTop: "18px",
                  }}
                >
                  <div
                    style={{
                      background: "#f8fafc",
                      borderRadius: "16px",
                      padding: "14px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
                      来店回数
                    </p>
                    <p style={{ margin: "8px 0 0", fontSize: "24px", fontWeight: 700 }}>
                      {item.visitCount}
                    </p>
                  </div>

                  <div
                    style={{
                      background: "#f8fafc",
                      borderRadius: "16px",
                      padding: "14px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
                      キャンセル回数
                    </p>
                    <p style={{ margin: "8px 0 0", fontSize: "24px", fontWeight: 700 }}>
                      {item.cancelCount}
                    </p>
                  </div>

                  <div
                    style={{
                      background: "#f8fafc",
                      borderRadius: "16px",
                      padding: "14px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
                      無断キャンセル
                    </p>
                    <p style={{ margin: "8px 0 0", fontSize: "24px", fontWeight: 700 }}>
                      {item.noShowCount}
                    </p>
                  </div>

                  <div
                    style={{
                      background: "#eef2ff",
                      borderRadius: "16px",
                      padding: "14px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
                      スコア
                    </p>
                    <p style={{ margin: "8px 0 0", fontSize: "24px", fontWeight: 700 }}>
                      {score}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    padding: "14px 16px",
                    borderRadius: "16px",
                    background: "#fefce8",
                    color: "#854d0e",
                    fontWeight: 600,
                  }}
                >
                  注意: {item.note}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginTop: "18px",
                  }}
                >
                  <button
                    onClick={() => updateReservation(item.id, "visited")}
                    style={{
                      border: "none",
                      borderRadius: "14px",
                      padding: "12px 18px",
                      cursor: "pointer",
                      fontWeight: 700,
                      background: "#16a34a",
                      color: "#ffffff",
                    }}
                  >
                    来店
                  </button>

                  <button
                    onClick={() => updateReservation(item.id, "cancelled")}
                    style={{
                      border: "none",
                      borderRadius: "14px",
                      padding: "12px 18px",
                      cursor: "pointer",
                      fontWeight: 700,
                      background: "#f59e0b",
                      color: "#ffffff",
                    }}
                  >
                    キャンセル
                  </button>

                  <button
                    onClick={() => updateReservation(item.id, "no_show")}
                    style={{
                      border: "none",
                      borderRadius: "14px",
                      padding: "12px 18px",
                      cursor: "pointer",
                      fontWeight: 700,
                      background: "#dc2626",
                      color: "#ffffff",
                    }}
                  >
                    無断キャンセル
                  </button>
                </div>
              </div>
            );
          })}

          {filteredReservations.length === 0 && (
            <div
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                padding: "28px",
                textAlign: "center",
                color: "#6b7280",
              }}
            >
              該当する予約はありません。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}