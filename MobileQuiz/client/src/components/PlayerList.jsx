function PlayerList({ players }) {
  return (
    <div className="mt-4">
      <h3 className="text-white font-semibold mb-2">Players</h3>
      <div className="space-y-2">
        {players.map((p, index) => (
          <div
            key={index}
            className="bg-white/20 text-white p-2 rounded"
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerList;