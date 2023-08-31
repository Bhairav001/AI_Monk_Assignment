import { useState } from "react";

const TagView = ({ tag, onUpdate, onAddChild }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [tagName, setTagName] = useState(tag.name);
  const [data, setData] = useState(tag.data || "");

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleNameClick = () => {
    setEditingName(true);
  };

  const handleNameChange = (e) => {
    setTagName(e.target.value);
  };

  const handleNameKeyPress = (e) => {
    if (e.key === "Enter") {
      setEditingName(false);
      onUpdate({ ...tag, name: tagName });
    }
  };

  const handleDataChange = (e) => {
    setData(e.target.value);
    onUpdate({ ...tag, data: e.target.value });
  };

  const handleAddChild = () => {
    onAddChild(tag);
  };

  return (
    <div className="tag">
      <div className="tag-header">
        <button className="collapse-button" onClick={handleToggleCollapse}>
          {collapsed ? ">" : "v"}
        </button>
        {editingName ? (
          <input
            type="text"
            value={tagName}
            onChange={handleNameChange}
            onBlur={() => setEditingName(false)}
            onKeyPress={handleNameKeyPress}
          />
        ) : (
          <span className="tag-name" onClick={handleNameClick}>
            {tagName}
          </span>
        )}
        {tag.children && (
          <button className="add-child-button" onClick={handleAddChild}>
            Add Child
          </button>
        )}
      </div>
      {!collapsed && (
        <div className="tag-content">
          {data !== undefined && (
            <input
              type="text"
              value={data}
              onChange={handleDataChange}
              placeholder="Enter data"
            />
          )}
          {tag.children &&
            tag.children.map((child, index) => (
              <TagView
                key={index}
                tag={child}
                onUpdate={(updatedTag) => {
                  const updatedChildren = [...tag.children];
                  updatedChildren[index] = updatedTag;
                  onUpdate({ ...tag, children: updatedChildren });
                }}
                onAddChild={(parentTag) => {
                  const updatedChildren = [
                    ...parentTag.children,
                    { name: "New Child", data: "Data" },
                  ];
                  onUpdate({ ...parentTag, children: updatedChildren });
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default TagView;
