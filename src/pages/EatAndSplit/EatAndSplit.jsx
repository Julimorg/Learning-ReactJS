import React from "react";
// import "../EatAndSplit/styles.css";
import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
const EatAndSplit = () => {
  const [formAddFriendOpen, setFormAddFriendOpen] = useState(false);
  const [friends, setNewFriends] = useState(initialFriends);
  const [selectFriends, setSelectFriends] = useState(null);

  function handleDisplayAddFriendForm() {
    setFormAddFriendOpen((formAddFriendOpen) => !formAddFriendOpen);
  }
  function hanldeAddNewFriend(friend) {
    setNewFriends((friends) => [...friends, friend]);
    setFormAddFriendOpen(false);
  }

  function handleSelectedFriends(friend) {
    setSelectFriends((cur) => cur?.id === friend.id ? null : friend);
  }

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendList
            friends={friends}
            onSelection={handleSelectedFriends}
            selectFriends={selectFriends}
          />

          {formAddFriendOpen && (
            <FormAddFriend
              hanldeAddNewFriend={hanldeAddNewFriend}
              setFormAddFriendOpen={setFormAddFriendOpen}
            />
          )}
          <Button onClickBtn={handleDisplayAddFriendForm}>
            {formAddFriendOpen ? "Close" : "Add Friend"}
          </Button>
        </div>
        {selectFriends && <FormSplitBill selectFriends={selectFriends} />}
      </div>
    </>
  );
};

function FriendList({ friends, onSelection, selectFriends }) {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelection={onSelection}
            selectFriends={selectFriends}
          />
        ))}
      </ul>
    </>
  );
}
function Friend({ friend, onSelection, selectFriends }) {
  const isSelected = selectFriends?.id === friend.id;
  return (
    <>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {friend.balance}{" "}
          </p>
        )}
        {friend.balance === 0 && (
          <p className="grey">You and {friend.name} are event</p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owe you {friend.balance}
          </p>
        )}
        <Button
          onClickBtn={() => onSelection(friend) }
        >
          {isSelected ? "Close" : "Selected"}
        </Button>
      </li>
    </>
  );
}

function Button({ children, onClickBtn }) {
  return (
    <button className="button" onClick={onClickBtn}>
      {children}
    </button>
  );
}

function FormAddFriend({ hanldeAddNewFriend }) {
  const [friendName, setFriendName] = useState("");
  const [friendImg, setFriendImg] = useState("https://i.pravatar.cc/48");
  const [balance, setBalance] = useState(0);

  function hanldeOnSubmitAdd(e) {
    e.preventDefault();

    if (!friendName || !friendImg) return;

    const id = crypto.randomUUID();
    const addFriend = {
      id,
      name: friendName,
      image: `${friendImg}?=${id}`,
      balance,
    };
    hanldeAddNewFriend(addFriend);

    console.log(addFriend);
  }
  return (
    <>
      <form className="form-add-friend" onSubmit={hanldeOnSubmitAdd}>
        <label>Friend Name</label>
        <input
          type="text"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
        <label>Image URL</label>
        <input
          type="text"
          value={friendImg}
          onChange={(e) => setFriendImg(e.target.value)}
        />
        <label>Balance</label>
        <input
          type="text"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </>
  );
}

function FormSplitBill({ selectFriends }) {
  return (
    <>
      <form action="" className="form-split-bill">
        <h2>Split a bill with {selectFriends.name}</h2>

        <label>Bill Value</label>
        <input type="text" />

        <label>Your Expense</label>
        <input type="text" />

        <label>X's expense</label>
        <input type="text" />

        <label>Who is paying the bill</label>
        <select>
          <option value="user">You</option>
          <option value="friend">X</option>
        </select>

        <Button>Split Bill</Button>
      </form>
    </>
  );
}

export default EatAndSplit;
