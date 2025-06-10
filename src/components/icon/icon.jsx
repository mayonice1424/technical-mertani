import React, { useState, useEffect } from "react";
import * as FaIcon from "react-icons/fa";
import * as MdIcon from "react-icons/md";

// Define a mapping of icon sets to their import functions
const iconSets = {
  fa: async () => FaIcon,
  md: async () => MdIcon,
  // You can add more icon sets here if needed
};

// Function to get the correct icon component dynamically
const getIconComponent = async (iconSet, iconName) => {
  const importIcons = iconSets[iconSet];
  if (!importIcons) {
    return null;
  }

  const icons = await importIcons();
  console.log("name", iconName);
  return icons[iconName] || null;
};

const IconRenderer = ({ iconSet, iconName }) => {
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Dynamically load the icon component based on the iconSet and iconName
    getIconComponent(iconSet, iconName).then((component) => {
      if (isMounted) {
        setIconComponent(() => component);
      }
    });

    return () => {
      isMounted = false; // Cleanup on component unmount
    };
  }, [iconSet, iconName]); // Re-run the effect when iconSet or iconName changes

  return IconComponent ? <IconComponent /> : <span>Icon not found</span>;
};

export default IconRenderer;
