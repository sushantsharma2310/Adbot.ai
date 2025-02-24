import { motion } from 'framer-motion';
import { FiType, FiImage, FiGrid, FiAlignCenter, FiMove } from 'react-icons/fi';

const Toolbar = ({ onAddElement }) => {
  const tools = [
    { icon: FiType, label: 'Add Text', action: () => onAddElement('text') },
    { icon: FiImage, label: 'Add Image', action: () => onAddElement('image') },
    { icon: FiGrid, label: 'Grid', action: () => {} },
    { icon: FiAlignCenter, label: 'Align', action: () => {} },
    { icon: FiMove, label: 'Move', action: () => {} },
  ];

  return (
    <div className="w-16 bg-white border-r border-gray-200 py-4">
      <div className="flex flex-col items-center space-y-4">
        {tools.map((tool, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={tool.action}
            className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
            title={tool.label}
          >
            <tool.icon size={24} />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;