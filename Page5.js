import React, { useContext } from 'react';
import { MazeContext } from '../MazeContext';

function Page5() {
  const {
    maze_type, num_rows, num_cols, time_delay, cell_types,
    agent, algo_choice, total_timesteps, custom_name,
    useCustomMaze, customMazeFile, provideOwnAgent
  } = useContext(MazeContext);

  return (
    <div>
      <h2>Simulation Details</h2>
      <p>Maze Type: {maze_type}</p>
      <p>Number of Rows: {num_rows}</p>
      <p>Number of Columns: {num_cols}</p>
      <p>Time Delay: {time_delay}</p>
      <p>Cell Types: {JSON.stringify(cell_types)}</p>
      <p>Agent File: {agent ? agent.name : 'None'}</p>
      <p>Algorithm: {algo_choice}</p>
      <p>Number of Timesteps: {total_timesteps}</p>
      <p>Custom Name: {custom_name}</p>
      <p>Provide Own Agent: {provideOwnAgent}</p>
      <p>Use Custom Maze: {useCustomMaze}</p>
      <p>Custom Maze File: {customMazeFile ? customMazeFile.name : 'None'}</p>
    </div>
  );
}

export default Page5;