import React from 'react'
import { Trophy, MessageCircle, Music, Sparkles, Clock } from 'lucide-react'

const activities = [
  {
    id: 1,
    icon: <Trophy size={20} className="text-amber-500" />,
    iconBg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    text: 'Earned "Active Member" badge',
    time: '2 hours ago',
    user: 'You',
    avatar: 'https://i.pravatar.cc/40?u=you'
  },
  {
    id: 2,
    icon: <MessageCircle size={20} className="text-blue-600" />,
    iconBg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    text: 'Posted in "General Discussion"',
    time: '1 day ago',
    user: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/40?u=sarah'
  },
  {
    id: 3,
    icon: <Music size={20} className="text-purple-600" />,
    iconBg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    text: 'Added new listing: Guitar Lessons',
    time: '2 days ago',
    user: 'Mike Davis',
    avatar: 'https://i.pravatar.cc/40?u=mike'
  },
  {
    id: 4,
    icon: <Sparkles size={20} className="text-pink-600" />,
    iconBg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    text: 'Joined the community',
    time: '3 days ago',
    user: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/40?u=emma'
  }
]

export default function ActivityFeed() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-black mb-6 relative inline-block"
          style={{ color: '#1f2937' }}>
        Recent Activity
        <div className="absolute -bottom-2 left-0 w-16 h-1 rounded-full"
             style={{ background: 'linear-gradient(90deg, #2D68C4, #FE6F5E)' }} />
      </h2>

      <div className="activity-grid">
        {activities.map((activity, index) => (
          <div key={activity.id}
               className="glass-card rounded-2xl p-5 card-hover cursor-pointer group"
               style={{ 
                 boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                 animation: `fadeIn 0.5s ease ${index * 0.1}s backwards`
               }}>
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                              shadow-md group-hover:scale-110 transition-transform duration-300"
                   style={{ background: activity.iconBg }}>
                {activity.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold text-gray-800 leading-tight">
                    {activity.text}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                    <Clock size={12} />
                    {activity.time}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src={activity.avatar}
                         alt={activity.user}
                         className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {activity.user}
                  </span>
                </div>
              </div>
            </div>

            {/* Hover Effect Line */}
            <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 mt-4 rounded-full"
                 style={{ background: 'linear-gradient(90deg, #2D68C4, #FE6F5E)' }} />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 text-center">
        <button className="px-6 py-3 rounded-xl font-bold text-gray-700 border-2 border-gray-300
                           hover:border-blue-500 hover:text-blue-600 transition-all duration-300
                           hover:-translate-y-1 hover:shadow-lg">
          View All Activity
        </button>
      </div>
    </section>
  )
}