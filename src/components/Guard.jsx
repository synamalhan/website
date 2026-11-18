import { Component } from "react";

// Error boundary for optional extras (the 3D orca): if it fails to load or render, show `fallback` instead of crashing the page.
export default class Guard extends Component {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? (this.props.fallback ?? null) : this.props.children; }
}
