import { useState } from 'react';

export default function RamoCustomerPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');

  const customer = {
    firstName: '将弥',
    visitCount: 7,
    reservationCount: 8,
    rank: 'Silver',
    nextRank: 'Gold',
    nextRankVisitsNeeded: 1,
    trustLabel: '高',
    perks: ['乾杯ドリンク 1杯サービス', 'デザート先行案内', '優先予約案内'],
    reservation: {
      date: '2026年4月12日（日）',
      time: '19:30',
      guests: '4名',
      plan: 'ディナー席予約',
      cancelFee: '当日キャンセル時 1名あたり 4,000円',
    },
  };

  return (
    <div className="min-h-screen bg-[#F7FBFB] text-neutral-900">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl">
        {/* Header / Branding */}
        <div className="bg-gradient-to-br from-[#14532D] to-[#86EFAC] text-white px-6 pt-8 pb-7 rounded-b-[2rem]">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-lg tracking-widest">
                R
              </span>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-white/80">
                RANKA
              </p>
              <p className="text-xs text-white/90">通うほど、価値が上がる。</p>
            </div>
          </div>

          <p className="mt-4 text-xs tracking-[0.22em] uppercase text-white/80">
            for Ramo
          </p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight">
            ご予約ありがとうございます
          </h1>

          <p className="mt-2 text-sm text-white/90 leading-relaxed">
            {customer.firstName}さまは現在{' '}
            <span className="font-semibold">RANKA {customer.rank} Member</span>{' '}
            です。
            安定してご利用いただいているお客様として、今回のご予約でも特典対象になっています。
          </p>

          {/* Rank Card */}
          <div className="mt-6 bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-white/80">RANKA Member</p>
                <p className="mt-1 text-3xl font-bold">{customer.rank}</p>
                <p className="mt-2 text-sm text-white/90">
                  あと{customer.nextRankVisitsNeeded}回来店で{' '}
                  {customer.nextRank}
                </p>
              </div>
              <div className="rounded-2xl bg-white/15 px-4 py-3 text-center min-w-[92px]">
                <p className="text-[11px] text-white/75">信頼</p>
                <p className="mt-1 text-xl font-semibold">
                  {customer.trustLabel}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/15 p-3 text-center">
                <p className="text-[11px] text-white/75">予約回数</p>
                <p className="mt-1 text-xl font-semibold">
                  {customer.reservationCount}
                </p>
              </div>
              <div className="rounded-2xl bg-white/15 p-3 text-center">
                <p className="text-[11px] text-white/75">来店回数</p>
                <p className="mt-1 text-xl font-semibold">
                  {customer.visitCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-6 space-y-5">
          {/* Reservation Form */}
          <section className="rounded-3xl border border-neutral-200 p-5 bg-white">
            <h2 className="text-lg font-semibold">予約情報の入力</h2>

            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm"
                placeholder="名前"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm"
                placeholder="電話番号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <input
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              <input
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm"
                placeholder="人数"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
          </section>
          {/* Perks */}
          <section className="rounded-3xl border border-neutral-200 p-5 bg-white">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">今回の特典</h2>
              <span className="text-xs px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] font-medium">
                利用可能
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {customer.perks.map((perk) => (
                <div
                  key={perk}
                  className="rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] px-4 py-3 text-sm text-neutral-700"
                >
                  {perk}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-3xl border border-[#BBF7D0] bg-[#F0FDF4] p-5">
            <button
              className="mt-2 w-full rounded-2xl bg-[#16A34A] px-5 py-4 text-base font-semibold text-white shadow-sm"
              onClick={() => {
                if (!name || !phone || !date || !time || !guests) {
                  alert('未入力の項目があります');
                  return;
                }

                console.log({ name, phone, date, time, guests });
                alert('予約を受け付けました');
              }}
            >
              予約を確定する（特典対象）
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
