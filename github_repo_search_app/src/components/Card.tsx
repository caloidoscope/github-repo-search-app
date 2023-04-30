interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
          <path clipRule="evenodd" d="M10 14.142l-5.858 3.572 1.41-6.627L1.59 7.286l6.573-.572L10 1.715l2.837 5.999 6.573.572-4.963 4.802 1.41 6.627L10 14.142zm0-1.886l3.675 2.242-1.057-4.96 3.518-3.396-4.852-.42L10 3.828 7.716 8.693l-4.852.42 3.518 3.396-1.057 4.96L10 12.256z"/>
        </svg>
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}

export default Card;