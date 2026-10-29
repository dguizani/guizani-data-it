# Lighthouse do site atual (celular), 2026-10-28

| parte | objeto | linhas |
|---|---|---|
| execução | ambiente | 13–24 |
| notas | categorias | 26–33 |
| notas | métricas | 35–43 |
| falhas | performance | 45–58 |
| falhas | accessibility | 60–64 |
| falhas | best-practices | 66–71 |
| falhas | seo | 73–77 |

### execução · ambiente

```text
lighthouse 13.6.0
url https://datait.guizani.com.br/
fetchTime 2026-10-29T00:10:21.884Z
formFactor mobile
throttlingMethod simulate
rttMs 150 throughputKbps 1638.4 cpuSlowdownMultiplier 4
benchmarkIndex 3035
runWarnings 0
```

### notas · categorias

```text
performance 85
accessibility 92
best-practices 92
seo 91
```

### notas · métricas

```text
first-contentful-paint 1.9 s (score 0.88)
largest-contentful-paint 3.9 s (score 0.52)
total-blocking-time 0 ms (score 1)
cumulative-layout-shift 0 (score 1)
speed-index 4.1 s (score 0.79)
```

### falhas · performance

```text
first-contentful-paint score 0.88 weight 10 1.9 s
largest-contentful-paint score 0.52 weight 25 3.9 s
speed-index score 0.79 weight 10 4.1 s
cache-insight score 0 weight 0 Est savings of 227 KiB
image-delivery-insight score 0 weight 0 Est savings of 235 KiB
lcp-discovery-insight score 0 weight 0
network-dependency-tree-insight score 0 weight 0
render-blocking-insight score 0 weight 0 Est savings of 830 ms
interactive score 0.88 weight 0 3.9 s
unsized-images score 0.5 weight 0
```

### falhas · accessibility

```text
color-contrast score 0 weight 7
```

### falhas · best-practices

```text
image-size-responsive score 0 weight 1
errors-in-console score 0 weight 1
```

### falhas · seo

```text
meta-description score 0 weight 1
```
