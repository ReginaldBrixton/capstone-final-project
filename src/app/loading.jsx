'use client';

const subjects = [
  'Math',
  'Science', 
  'History',
  'Literature',
  'Art',
  'Music',
  'Geography',
  'Physics',
];

export default function FloatingSubjectsLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
      <div className="text-center">
        <div className="relative w-64 h-64 mx-auto mb-8">
          {subjects.map((subject, index) => (
            <div
              key={subject}
              className="absolute text-lg font-bold text-purple-600 dark:text-purple-300"
              style={{
                opacity: 0,
                transform: `translate(
                  ${Math.cos((index / subjects.length) * Math.PI * 2) * 100}px,
                  ${Math.sin((index / subjects.length) * Math.PI * 2) * 100}px
                ) scale(0.5)`,
                animation: `float 4s ease-in-out ${index * 0.5}s infinite`
              }}
            >
              {subject}
            </div>
          ))}
          <div 
            className="absolute inset-0 rounded-full bg-purple-200 dark:bg-purple-700"
            style={{
              animation: "pulse 2s ease-in-out infinite"
            }}
          />
        </div>
        <h2 
          className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4"
          style={{
            opacity: 0,
            animation: "fadeIn 0.5s ease-in-out 0.5s forwards"
          }}
        >
          Gathering Wisdom...
        </h2>
        <div
          className="w-64 h-2 bg-purple-200 dark:bg-purple-700 rounded-full mx-auto overflow-hidden"
          style={{
            animation: "grow 2s linear infinite"
          }}
        >
          <div
            className="h-full bg-purple-500 dark:bg-purple-300 rounded-full"
            style={{
              animation: "slide 1s linear infinite"
            }}
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            opacity: 0;
            transform: translate(
              ${Math.cos((0 / subjects.length) * Math.PI * 2) * 100}px,
              ${Math.sin((0 / subjects.length) * Math.PI * 2) * 100}px
            ) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translate(
              ${Math.cos((0 / subjects.length) * Math.PI * 2) * 100}px,
              ${Math.sin((0 / subjects.length) * Math.PI * 2) * 100}px
            ) scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes grow {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes slide {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
