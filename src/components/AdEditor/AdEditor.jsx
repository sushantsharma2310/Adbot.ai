import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import { HexColorPicker } from 'react-colorful';
import { FiSave, FiDownload, FiEye, FiType, FiImage, FiGrid, FiAlignCenter, FiMove } from 'react-icons/fi';
import Toolbar from './Toolbar';
import ColorPalette from './ColorPalette';
import PreviewDownload from './PreviewDownload';

const AdEditor = () => {
  const navigate = useNavigate();
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [brandColors, setBrandColors] = useState({
    primary: '#4F46E5',
    secondary: '#818CF8',
    accent: '#C7D2FE',
    neutral: '#F3F4F6'
  });

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      content: type === 'text' ? 'Double click to edit' : 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=150&h=150&fit=crop',
      position: { x: 0, y: 0 },
      size: { width: 150, height: type === 'text' ? 50 : 150 },
      color: '#000000',
      fontSize: 16
    };
    setElements([...elements, newElement]);
  };

  const handleDrag = (id, e, data) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, position: { x: data.x, y: data.y } } : el
    ));
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleTextEdit = (id, content) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, content } : el
    ));
  };

  const saveDraft = () => {
    navigate('/dashboard');
  };

  return (
    <div className="ml-64 flex h-screen bg-gray-100">
      <Toolbar onAddElement={addElement} />

      <div className="flex-1 p-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Ad Editor</h2>
          <div className="flex space-x-4">
            <button
              onClick={saveDraft}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              <FiSave className="mr-2" />
              Save Draft
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg"
            >
              <FiEye className="mr-2" />
              Preview
            </button>
          </div>
        </div>

        <div 
          className="bg-white rounded-lg shadow-lg"
          style={{
            width: '600px',
            height: '600px',
            position: 'relative',
            backgroundColor
          }}
        >
          {elements.map(element => (
            <Draggable
              key={element.id}
              position={element.position}
              onDrag={(e, data) => handleDrag(element.id, e, data)}
              onStop={() => handleElementClick(element)}
            >
              <div
                className={`absolute cursor-move ${
                  selectedElement?.id === element.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                style={{
                  width: element.size.width,
                  height: element.size.height
                }}
              >
                {element.type === 'text' ? (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleTextEdit(element.id, e.target.textContent)}
                    style={{
                      color: element.color,
                      fontSize: `${element.fontSize}px`
                    }}
                    className="outline-none"
                  >
                    {element.content}
                  </div>
                ) : (
                  <img
                    src={element.content}
                    alt="Ad element"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </Draggable>
          ))}
        </div>
      </div>

      <div className="w-64 bg-white border-l border-gray-200 p-4">
        <ColorPalette
          brandColors={brandColors}
          setBrandColors={setBrandColors}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
        />
      </div>

      {showPreview && (
        <PreviewDownload
          adContent={elements}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default AdEditor;