import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MentionBubble({ user, color, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: -50, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`absolute left-1/2 -translate-x-1/2 top-0 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-md ${color} pointer-events-none z-20`}
        >
          {user}
        </motion.div>
      )}
    </AnimatePresence>
  )
}