"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeUpProps {
  children: ReactNode;
  /**
   * ระยะเวลาหน่วงก่อนเริ่ม Animation (ค่าเริ่มต้น 0)
   */
  delay?: number;
  /**
   * ความเร็วของ Animation (ค่าเริ่มต้น 0.6 วินาที)
   */
  duration?: number;
  /**
   * ระยะทาง (Pixel) เริ่มต้นที่ตัวอักษรจะโผล่ขึ้นมา (ค่าเริ่มต้น 30)
   */
  yOffset?: number;
  /**
   * CSS Classes เพิ่มเติม
   */
  className?: string;
  /**
   * เล่น Animation แค่ครั้งเดียว (true) หรือเล่นทุกครั้งที่เลื่อนจอมาเจอ (false)
   */
  once?: boolean;
  /**
   * จุด Trigger: ระยะที่โผล่พ้นหน้าจอขึ้นมาก่อนที่ Animation จะเล่น (เช่น "-20%" หมายถึงต้องโผล่เข้ามาอย่างน้อย 20% ของหน้าจอ)
   */
  margin?: string;
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 30,
  className = "",
  once = true,
  margin = "-20%", // Margin -20% เทียบเท่ากับให้โผล่พ้นขอบล่างของหน้าจอขึ้นมาประมาณ 20% ของ viewport ถึงจะ trigger
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
