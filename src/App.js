import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    winnings: 0,
    winState: false,
    loseState: false
  };

  componentDidMount() {
    this.setState({ friends: this.shuffleArray(this.state.friends) })
  }

  /**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
shuffleArray = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

  // pickFriend = (id, picked) => {
  //   // Filter this.state.friends for friends with an id not equal to the id being removed
  //   const friends = this.state.friends;

  // };

  handleGoodGuess = newGuess => {
    const { winnings } = this.state;
    const newWin = winnings + 1;

    if (winnings >= 5) {
      this.setState({ friends: this.winGame(newGuess) });
    } else {
        this.setState({ friends: this.shuffleArray(newGuess),
          winnings: newWin
        });
    ;}
  };

  handleBadGuess = newGuess => {
    this.setState({
      data: this.resetGuess(newGuess),
      winnings: 0
    });
  };

  winGame = guess => {
    alert('You win!')
    const winGame = guess.map(e => ({ ...e, clicked: false}))
    window.location.reload('/');
    return this.shuffleArray(winGame);
  }

  resetGuess = guess => {
    alert('Wrong Pick!')
    const resetGuess = guess.map(e => ({ ...e, clicked: false}))
    window.location.reload('/');
    return this.shuffleArray(resetGuess);
  };

  handleGuess = id => {
    let goodGuess = false;
    const newFriends = this.state.friends.map( i => {
      const newFriend = { ...i };
      if (newFriend.id === id) {
        if (!newFriend.clicked) {
          newFriend.clicked = true;
          goodGuess = true;
        };
      };
      return newFriend;
    });
    goodGuess ? this.handleGoodGuess(newFriends) : this.handleBadGuess(newFriends);
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title
          winnings={this.state.winnings}
        >Friends List</Title>
        {this.state.friends.map(friend => (
          <FriendCard
            pickFriend={this.pickFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
            picked={friend.picked}
            handleClick={this.handleGuess} 
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
