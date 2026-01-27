<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Grannskapet</h3>
          <p class="footer-text">Digital plattform för hyresgästföreningar</p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-subtitle">Länkar</h4>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Om oss</a></li>
            <li><a href="#" class="footer-link">Kontakt</a></li>
            <li><a href="#" class="footer-link">Support</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-subtitle">Juridiskt</h4>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Integritetspolicy</a></li>
            <li><a href="#" class="footer-link">Användarvillkor</a></li>
            <li><a href="#" class="footer-link">Cookies</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">&copy; {{ currentYear }} Grannskapet. Alla rättigheter förbehållna.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.app-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 2rem 1rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin: 0;
}

.footer-subtitle {
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.footer-text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-primary);
}

.footer-bottom {
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.copyright {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}
</style>
