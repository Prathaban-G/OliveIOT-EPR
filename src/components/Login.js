import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Login.css';

import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  Shield, 
  Clock,
  ExternalLink
} from 'lucide-react';

const LoginAlt = ({ onLogin }) => {
  const [credentials, setCredentials] = React.useState({
    username: 'Admin',
    password: 'Admin@123'
  });
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const threeContainerRef = useRef(null);
  
  useEffect(() => {
    // Initialize Three.js scene
    const container = threeContainerRef.current;
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x080c1d, 1);
    container.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.z = 30;
    
    // Create industrial IoT elements
    const objects = [];
    
    // Factory nodes
    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color(0.1, 0.6, 0.8),
        transparent: true,
        opacity: 0.7,
        wireframe: Math.random() > 0.7
      });
      
      const node = new THREE.Mesh(geometry, material);
      
      // Position in 3D space
      node.position.x = (Math.random() - 0.5) * 60;
      node.position.y = (Math.random() - 0.5) * 40;
      node.position.z = (Math.random() - 0.5) * 40 - 10;
      
      // Random rotation
      node.rotation.x = Math.random() * Math.PI;
      node.rotation.y = Math.random() * Math.PI;
      
      // Random scale
      const scale = Math.random() * 0.5 + 0.5;
      node.scale.set(scale, scale, scale);
      
      scene.add(node);
      objects.push(node);
    }
    
    // Connection lines between nodes
    const connections = [];
    for (let i = 0; i < 30; i++) {
      if (i >= objects.length - 1) break;
      
      // Create a random connection between two nodes
      const sourceNode = objects[i];
      const targetNode = objects[(i + 1 + Math.floor(Math.random() * 5)) % objects.length];
      
      const points = [];
      points.push(new THREE.Vector3(sourceNode.position.x, sourceNode.position.y, sourceNode.position.z));
      points.push(new THREE.Vector3(targetNode.position.x, targetNode.position.y, targetNode.position.z));
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x3f88c5, 
        transparent: true, 
        opacity: 0.4 
      });
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
      connections.push({
        line: line,
        source: sourceNode,
        target: targetNode,
        progress: 0,
        speed: Math.random() * 0.01 + 0.003
      });
    }
    
    // Data packet animation
    const packetGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const packets = connections.map(connection => {
      const packet = new THREE.Mesh(
        packetGeometry,
        new THREE.MeshBasicMaterial({ 
          color: 0x5cc8ff, 
          transparent: true, 
          opacity: 0.8 
        })
      );
      scene.add(packet);
      return {
        mesh: packet,
        connection,
        active: Math.random() > 0.5
      };
    });
    
    // Create a fog effect
    scene.fog = new THREE.FogExp2(0x080c1d, 0.015);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate nodes slowly
      objects.forEach(node => {
        node.rotation.x += 0.002;
        node.rotation.y += 0.003;
      });
      
      // Animate data packets
      packets.forEach(packet => {
        if (packet.active) {
          const conn = packet.connection;
          conn.progress += conn.speed;
          
          if (conn.progress > 1) {
            conn.progress = 0;
            packet.active = Math.random() > 0.3; // 70% chance to continue
          }
          
          // Calculate position along the line
          const sourcePos = conn.source.position;
          const targetPos = conn.target.position;
          
          packet.mesh.position.x = sourcePos.x + (targetPos.x - sourcePos.x) * conn.progress;
          packet.mesh.position.y = sourcePos.y + (targetPos.y - sourcePos.y) * conn.progress;
          packet.mesh.position.z = sourcePos.z + (targetPos.z - sourcePos.z) * conn.progress;
          
          // Pulse effect
          const pulseScale = 1 + Math.sin(Date.now() * 0.01) * 0.2;
          packet.mesh.scale.set(pulseScale, pulseScale, pulseScale);
          
          // Only show active packets
          packet.mesh.visible = true;
        } else {
          packet.mesh.visible = false;
          if (Math.random() < 0.01) {
            packet.active = true;
          }
        }
      });
      
      // Subtle camera movement for depth effect
      camera.position.x = Math.sin(Date.now() * 0.0005) * 2;
      camera.position.y = Math.cos(Date.now() * 0.0003) * 2;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      
      // Dispose of geometries and materials
      objects.forEach(obj => {
        obj.geometry.dispose();
        obj.material.dispose();
      });
      
      connections.forEach(conn => {
        conn.line.geometry.dispose();
        conn.line.material.dispose();
      });
      
      packets.forEach(packet => {
        packet.mesh.geometry.dispose();
        packet.mesh.material.dispose();
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }
    
    // In a real app, this would be an API call
    if (credentials.username && credentials.password) {
      onLogin({
        username: credentials.username,
        name: 'Admin User'
      });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-alt-container">
      {/* Three.js container - positioned absolutely to fill the background */}
      <div ref={threeContainerRef} className="three-background"></div>
      
      <div className="login-alt-card">
        <div className="login-alt-header">
          <div className="login-alt-logo">
            <div className="logo-badge">
              <Shield size={22} />
            </div>
            <h1>Olive<span>IOT</span></h1>
          </div>
          <h2>Enterprise Resource Planning</h2>
          <p>Sign in to your account to access the dashboard</p>
        </div>
        
        {error && (
          <div className="login-alt-error">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-alt-form">
          <div className="login-alt-input-group">
            <div className="login-alt-input-wrapper">
              <div className="login-alt-input-icon">
                <User size={18} />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="login-alt-input-group">
            <div className="login-alt-input-wrapper">
              <div className="login-alt-input-icon">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="login-alt-options">
            <label className="remember-option">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-option">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-alt-button">
            <span>Sign In</span>
            <ChevronRight size={18} />
          </button>
        </form>
        
        <div className="login-alt-footer">
          <div className="login-alt-support">
            <p>© 2025 OliveIOT. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAlt;