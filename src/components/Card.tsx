function Card({ user }) {
  return (
    <div
      className="card"
      style={{
        width: "18rem",
        height: "362px", // Reduced height
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <img
        src={user.profilepic} // Dynamic image URL
        className="card-img-top"
        alt={user.name}
        style={{
          height: "58%", // Image height adjusted
          objectFit: "cover",
        }}
      />
      <div
        className="card-body"
        style={{
          flex: 1,
          overflow: "hidden", // Prevents text from overflowing
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h5
          className="card-title"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user.name} {/* Dynamic card title */}
        </h5>
        <p
          className="card-text"
          style={{
            fontSize: "0.9rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2, // Limits text to 2 lines
            WebkitBoxOrient: "vertical",
          }}
        >
          {user.talent} {/* Dynamic text */}
        </p>
        <a
          href={`/user/${user.id}`} // Assuming you have a dynamic profile URL
          className="btn btn-primary btn-sm"
          style={{ alignSelf: "flex-start" }}
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

export default Card;
