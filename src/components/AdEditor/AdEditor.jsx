import { useState, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { motion } from 'framer-motion';
import {
  FiImage, FiType, FiSquare, FiCircle, FiHexagon,
  FiDownload, FiTrash2, FiCopy, FiBold, FiItalic,
  FiAlignLeft, FiAlignCenter, FiAlignRight, FiArrowLeft
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CanvasImage from '../Canvas/CanvasImage';
import CanvasText from '../Canvas/CanvasText';
import CanvasShape from '../Canvas/CanvasShape';
import Toolbar from '../Canvas/Toolbar';
import PropertyPanel from '../Canvas/PropertyPanel';

const AdEditor = () => {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(0);
  const stageRef = useRef(null);

  const addImage = (url) => {
    const newElement = {
      id: Date.now(),
      type: 'image',
      src: url,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    };
    addElement(newElement);
  };

  const addText = () => {
    const newElement = {
      id: Date.now(),
      type: 'text',
      text: 'Double click to edit',
      x: 100,
      y: 100,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: '#000000',
      width: 200,
      align: 'left',
      fontStyle: 'normal',
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    };
    addElement(newElement);
  };

  const addShape = (shapeType) => {
    const newElement = {
      id: Date.now(),
      type: 'shape',
      shapeType,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      fill: '#e3e3e3',
      stroke: '#000000',
      strokeWidth: 2,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    };
    addElement(newElement);
  };

  const addElement = (element) => {
    const newElements = [...elements, element];
    setElements(newElements);
    addToHistory(newElements);
  };

  const handleElementChange = (id, newProps) => {
    const newElements = elements.map((elem) =>
      elem.id === id ? { ...elem, ...newProps } : elem
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const addToHistory = (newElements) => {
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      setElements(history[historyStep - 1]);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      setElements(history[historyStep + 1]);
    }
  };

  const handleDelete = () => {
    if (selectedId) {
      const newElements = elements.filter(elem => elem.id !== selectedId);
      setElements(newElements);
      setSelectedId(null);
      addToHistory(newElements);
    }
  };

  const handleDuplicate = () => {
    if (selectedId) {
      const elementToDuplicate = elements.find(elem => elem.id === selectedId);
      const newElement = {
        ...elementToDuplicate,
        id: Date.now(),
        x: elementToDuplicate.x + 20,
        y: elementToDuplicate.y + 20
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      setSelectedId(newElement.id);
      addToHistory(newElements);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => addImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const downloadCanvas = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedElement = elements.find(elem => elem.id === selectedId);

  return (
    <div className="ml-64 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/templates">
              <motion.button
                whileHover={{ x: -5 }}
                className="flex items-center text-gray-600 hover:text-indigo-600"
              >
                <FiArrowLeft className="mr-2" />
                Back to Templates
              </motion.button>
            </Link>
            <h1 className="text-2xl font-bold ml-8">Ad Editor</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadCanvas}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FiDownload className="mr-2" />
            Download
          </motion.button>
        </div>
      </div>

      <div className="flex">
        {/* Left Toolbar */}
        <Toolbar
          onAddImage={() => document.getElementById('imageUpload').click()}
          onAddText={addText}
          onAddShape={addShape}
          onUndo={undo}
          onRedo={redo}
          canUndo={historyStep > 0}
          canRedo={historyStep < history.length - 1}
        />

        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Canvas Area */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Stage
              width={800}
              height={600}
              ref={stageRef}
              onClick={(e) => {
                if (e.target === e.target.getStage()) {
                  setSelectedId(null);
                }
              }}
            >
              <Layer>
                {elements.map((elem) => {
                  if (elem.type === 'image') {
                    return (
                      <CanvasImage
                        key={elem.id}
                        imageProps={elem}
                        isSelected={elem.id === selectedId}
                        onSelect={() => setSelectedId(elem.id)}
                        onChange={(newProps) => handleElementChange(elem.id, newProps)}
                      />
                    );
                  }
                  if (elem.type === 'text') {
                    return (
                      <CanvasText
                        key={elem.id}
                        textProps={elem}
                        isSelected={elem.id === selectedId}
                        onSelect={() => setSelectedId(elem.id)}
                        onChange={(newProps) => handleElementChange(elem.id, newProps)}
                      />
                    );
                  }
                  return (
                    <CanvasShape
                      key={elem.id}
                      shapeProps={elem}
                      isSelected={elem.id === selectedId}
                      onSelect={() => setSelectedId(elem.id)}
                      onChange={(newProps) => handleElementChange(elem.id, newProps)}
                    />
                  );
                })}
              </Layer>
            </Stage>
          </div>
        </div>

        {/* Right Property Panel */}
        <PropertyPanel
          selectedElement={selectedElement}
          onChange={(newProps) => handleElementChange(selectedId, newProps)}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onDownload={downloadCanvas}
        />
      </div>
    </div>
  );
};

export default AdEditor;