const terminalBody = document.getElementById('terminal-body');
const commandInput = document.getElementById('command-input');

// Focus on input field when the page loads
commandInput.focus();

// Command handler
commandInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = commandInput.value.trim();
    commandInput.value = ''; // Clear the input field
    handleCommand(command);
  }
});

// Available commands
const commands = {
  help: 'Available commands: help, clear, nmap, ping, whois, ls, cd, cat',
  clear: () => {
    terminalBody.innerHTML = '<div class="input-line"><span class="prompt">user@kali-simulator:~$</span><input type="text" id="command-input" autofocus></div>';
    document.getElementById('command-input').focus();
  },
  nmap: 'Simulating nmap scan...\nOpen ports: 22 (SSH), 80 (HTTP), 443 (HTTPS)',
  ping: 'Pinging google.com...\n64 bytes from 142.250.192.14: icmp_seq=1 ttl=115 time=15.4 ms',
  whois: 'Simulating whois lookup...\nDomain: example.com\nRegistrar: GoDaddy',
  ls: 'Desktop  Documents  Downloads  Music  Pictures  Videos',
  cd: 'Changing directory...',
  cat: 'File content: Hello, Kali Linux Simulator!',
};

// Handle commands
function handleCommand(command) {
  if (!command) return; // Ignore empty commands

  // Display the command
  const commandLine = document.createElement('div');
  commandLine.innerHTML = `<span class="prompt">user@kali-simulator:~$</span> ${command}`;
  terminalBody.appendChild(commandLine);

  // Handle the command
  if (commands[command]) {
    const response = typeof commands[command] === 'function' ? commands[command]() : commands[command];
    const responseLine = document.createElement('div');
    responseLine.textContent = response;
    terminalBody.appendChild(responseLine);
  } else {
    const errorLine = document.createElement('div');
    errorLine.textContent = `Command not found: ${command}`;
    terminalBody.appendChild(errorLine);
  }

  // Add a new input line
  const newInputLine = document.createElement('div');
  newInputLine.className = 'input-line';
  newInputLine.innerHTML = '<span class="prompt">user@kali-simulator:~$</span><input type="text" id="command-input" autofocus>';
  terminalBody.appendChild(newInputLine);

  // Focus on the new input field
  document.getElementById('command-input').focus();

  // Scroll to the bottom
  terminalBody.scrollTop = terminalBody.scrollHeight;
}
