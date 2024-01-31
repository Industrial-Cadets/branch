import React, { createContext, useState } from 'react';

export const MazeContext = createContext();

export const MazeProvider = ({ children }) => {
  const [maze_type, setMaze_type] = useState('');
  const [num_rows, setNum_rows] = useState('');
  const [num_cols, setNum_cols] = useState('');
  const [provideOwnAgent, setProvideOwnAgent] = useState('');
  const [time_delay, setTime_delay] = useState('');
  const [cell_types, setCell_types] = useState([]);
  const [agent, setAgent] = useState(null);
  const [algo_choice, setAlgo_choice] = useState('');
  const [total_timesteps, setTotal_timesteps] = useState('');
  const [custom_name, setCustom_name] = useState('');
  const [useCustomMaze, setUseCustomMaze] = useState('');
  const [customMazeFile, setCustomMazeFile] = useState('');


  const contextValue = {
    maze_type, setMaze_type,
    num_rows, setNum_rows,
    num_cols, setNum_cols,
    provideOwnAgent, setProvideOwnAgent,
    time_delay, setTime_delay,
    cell_types, setCell_types,
    agent, setAgent,
    algo_choice, setAlgo_choice,
    total_timesteps, setTotal_timesteps,
    custom_name, setCustom_name,
    useCustomMaze, setUseCustomMaze,
    customMazeFile, setCustomMazeFile,
  };

  return (
    <MazeContext.Provider value={contextValue}>
      {children}
    </MazeContext.Provider>
  );
};