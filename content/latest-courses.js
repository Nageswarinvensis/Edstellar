/**
 * "Explore our latest corporate training courses" — the hand-picked course
 * list shown on case studies and trainer profiles. Links point at the live
 * site's `/course/{slug}` URLs, as in the designs.
 */
export const LATEST_COURSES = [
  ["ML Model Monitoring Training", "ml-model-monitoring-training"],
  ["Real-Time Feature Engineering Training", "real-time-feature-engineering-training"],
  ["AI Decision Support Systems Training", "ai-decision-support-systems-training"],
  ["Supply Chain Decision Making Training", "supply-chain-decision-making-training"],
  ["Decision-Making in a Crisis Training", "decision-making-in-a-crisis-training"],
  ["Employee Experience (EX) Design and Measurement Training", "employee-experience-ex-design-and-measurement-training"],
  ["LLM Observability Training", "llm-observability-training"],
  ["Streaming Data Mesh Training", "streaming-data-mesh-training"],
  ["Multi-Modal Vector Search Training", "multi-modal-vector-search-training"],
  ["PostgreSQL Performance Tuning Training", "postgresql-performance-tuning-training"],
  ["Platform Engineering Training", "platform-engineering-training"],
  ["Cloud-Native Java Performance Engineering Training", "cloud-native-java-performance-engineering-training"],
  ["Building Internal Developer Platforms (IDP) Training", "building-internal-developer-platforms-idp-training"],
  ["Micro-Frontends Architecture Training", "micro-frontends-architecture-training"],
  ["Change Management for Generative AI Adoption Training", "change-management-for-generative-ai-adoption-training"],
  ["AI-Augmented Leadership Communication Training", "ai-augmented-leadership-communication-training"],
  ["LangChain Application Development Training", "langchain-application-development-training"],
  ["Human Factors Engineering Training", "human-factors-engineering-training"],
  ["IoT for Fleet Management Training", "iot-for-fleet-management-training"],
  ["Quantitative Investment Decision Training", "quantitative-investment-decision-training"],
].map(([label, slug]) => ({ label, href: `https://www.edstellar.com/course/${slug}` }));
