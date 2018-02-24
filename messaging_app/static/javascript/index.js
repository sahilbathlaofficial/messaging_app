/*
    To finish the task on time all reach components are in same file for now
    But ideally it should be in differ .jsx files & required wherever needed
*/

// To keep the user unique lets use timestamp here
// This is used to differentiate users as there is no authentication
if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', new Date().getTime())
}

/*
  This component takes care of adding new comment
  emptyMessage: Will remove any message entered by user
  sendMessage: Will send the user message to server & reload on success
*/

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.emptyMessage = this.emptyMessage.bind(this);
  }

  render() {
    return (
      <div>
        <textarea className="textarea" placeholder="Type your message here" value={this.state.message} onChange={this.handleChange}></textarea>
        <div className="fl-r mt-20">
          <button onClick={this.emptyMessage} className="btn btn--cancel">Cancel</button>
          <button onClick={this.sendMessage} className="btn btn--primary mr-10">Send</button>
        </div>
      </div>
    );
  }

  emptyMessage() {
    this.setState({
      message: ''
    });
  }

  sendMessage() {
    $.ajax({
      method: 'POST',
      url: '/messages',
      data: { content: this.state.message, user_id: localStorage.getItem('userId') }
    })
    .done(function( msg ) {
      window.location.reload();
    });
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }
}


/*
  This component takes care of displaying all comments
  isCurrentUser: Tells if the user is current one running the session or other
*/

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.formattedTime = (time) => {
      var date = new Date(time * 1000);

      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var day = date.getDay();
      var month = date.toLocaleString('en-us', { month: "short"});

      // Will display time in 10:30:23 format
      return day + ' ' + month + ',' + hours + ':' + minutes.substr(-2);
    };
    this.isCurrentUser = (userId) => {
      return userId.toString() == localStorage.getItem('userId')
    };
  }

  componentDidMount() {
    fetch('/messages')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="chat-box">
          {items.map((item, i) => (
            <div className={"message-box " + (this.isCurrentUser(item.userId) ? 'fl-r' : 'fl-l') } key={i}>
              <div className="message-box__header">
                <span className="message-box__header__name ">
                  { this.isCurrentUser(item.userId) ? 'You wrote:' : 'Peer #1 wrote:' }
                </span>
                <span className="message-box__header__timestamp">{this.formattedTime(item.time)}</span>
              </div>
              <div className="message-box__message">
                {item.content}
              </div>
            </div>
          ))}
          <AddComment/>
        </div>
      );
    }
  }
}



const element = <Comments/>;
ReactDOM.render(
	element,
	document.getElementById('root')
);