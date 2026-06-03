"use client";

import { motion } from "framer-motion";

const symbols = [
  { text: "{ }", className: "left-[5%] top-[18%] text-[130px]", delay: 0, rotate: -10 },
  { text: "*", className: "right-[8%] top-[16%] text-[190px]", delay: 0.1, rotate: 12 },
  { text: "{", className: "left-[14%] bottom-[10%] text-[210px]", delay: 0.2, rotate: 8 },
  { text: "}", className: "right-[16%] bottom-[12%] text-[175px]", delay: 0.3, rotate: -8 },
  { text: "*", className: "left-[46%] top-[10%] text-[105px]", delay: 0.4, rotate: 14 },
  { text: "{ }", className: "right-[4%] bottom-[34%] text-[110px]", delay: 0.5, rotate: -14 },
  { text: "*", className: "left-[32%] top-[62%] text-[80px]", delay: 0.6, rotate: 5 },
];

export default function BackgroundShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.22)_1px,transparent_1px)] [background-size:24px_24px] opacity-25 dark:opacity-20" />

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: [1, 1.08, 1] }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-[150px] dark:bg-emerald-400/10"
      />

      {symbols.map((symbol) => (
        <motion.span
          key={`${symbol.text}-${symbol.className}`}
          initial={{
            opacity: 0,
            y: 80,
            scale: 0.55,
            rotate: symbol.rotate - 30,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 0.8,
            y: [0, -34, 0, 22, 0],
            x: [0, 14, -10, 8, 0],
            scale: [1, 1.08, 0.98, 1.04, 1],
            rotate: [
              symbol.rotate,
              symbol.rotate + 8,
              symbol.rotate - 6,
              symbol.rotate + 4,
              symbol.rotate,
            ],
            filter: "blur(0px)",
          }}
          transition={{
            opacity: { duration: 0.9, delay: symbol.delay },
            filter: { duration: 0.9, delay: symbol.delay },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: symbol.delay },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: symbol.delay },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: symbol.delay },
            rotate: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: symbol.delay },
          }}
          className={`absolute font-black leading-none text-emerald-600/10 dark:text-emerald-300/10 ${symbol.className}`}
        >
          {symbol.text}
        </motion.span>
      ))}
    </div>
  );
}