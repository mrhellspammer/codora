import React from 'react'
import { motion } from 'framer-motion'
import MentionBubble from '../comp/MentionBubble'
import python from '../assets/python.jpg'
import react2 from '../assets/react2.jpg'
import java from '../assets/java.jpg'
import js from '../assets/js.jpg'
import cpp from '../assets/cpp.jpg'
import sql2 from '../assets/sql2.jpg'
import { useNavigate } from 'react-router-dom'

const artworks = [
  { src: python, user: '@Python', color: 'bg-[#377ef2]' },
  { src: react2, user: '@React', color: 'bg-[#41d5fe]' },
  { src: java, user: '@Java', color: 'bg-[#f1121e]' },
  { src: js, user: '@JavaScript', color: 'bg-[#f9e135]' },
  { src: cpp, user: '@C++', color: 'bg-[#00529c]' },
  { src: sql2, user: '@SQL', color: 'bg-[#b8d432]' },
]

const arch = [
  { rotate: -15, y: 30, x: -40 },
  { rotate: -10, y: 15, x: -20 },
  { rotate: -5, y: 5, x: -10 },
  { rotate: 5, y: 5, x: 10 },
  { rotate: 10, y: 15, x: 20 },
  { rotate: 15, y: 30, x: 40 },
]

export default function Home() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = React.useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-primary font-sans overflow-x-hidden">
      

      <section className="text-center mt-45 px-6">
        <h2 className="text-4xl md:text-5xl font-semibold">
        Code smarter, Learn faster, <span className="text-black">Only on Codora</span>
           
        </h2>

        {/* Artwork cards */}
        <div className="relative mt-20 flex justify-center items-center">
          <div className="relative flex">
            {artworks.map((art, i) => {
              let extraLift = 0
              if (i === 1) extraLift = -25
              if (i === 3) extraLift = -15
              if (i === 5) extraLift = -15

              return (
                <motion.div
                  key={i}
                  initial={{
                    rotate: arch[i].rotate,
                    y: arch[i].y + extraLift,
                    x: arch[i].x,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: (arch[i].y + extraLift) - 30,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative mx-[-1.6rem] group z-[1]"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Mention bubble */}
                  <MentionBubble
                    user={art.user}
                    color={art.color}
                    show={hoveredIndex === i}
                  />

                  {/* Artwork image */}
                  <img
                    src={art.src}
                    alt={`art-${i}`}
                    className="w-36 h-36 object-cover rounded-xl shadow-xl border border-gray-300 relative z-10"/>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Description */}
        <p className="mt-10 text-sm text-gray-600 max-w-md mx-auto">
        A place to explore ideas, gain real skills, and build your future — 
        {/* new line */}
        <br />
        one course at a time.
        </p>

        {/* Action buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={() => navigate('/register')} className="bg-black text-white px-6 py-3 rounded-full text-sm hover:bg-gray-700 cursor-pointer">Get Started</button>
          {/* <button className="border border-black px-6 py-3 rounded-full text-sm">Read more</button> */}
        </div>
      </section>
        {/* Footer */}
        <footer className="mt-50 py-2 bg-white border-t border-gray-200">
          <div className="conta5ner mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-4">CODORA</h3>
                <p className="text-gray-600 text-sm">
                  © {new Date().getFullYear()} CODORA. All rights reserved.
                </p>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-600 hover:text-gray-800">Terms</a>
                <a href="#" className="text-gray-600 hover:text-gray-800">Privacy</a>
                <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
}