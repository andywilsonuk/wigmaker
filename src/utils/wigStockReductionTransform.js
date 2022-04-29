const transform = (stocks, newWigCount) => ({
  wigs: newWigCount,
  wigsHair: stocks[4],
  wigsNylon: stocks[3],
  wigsSilicone: stocks[2],
  wigsAlgae: stocks[1],
  wigsSmart: stocks[0]
})

export default ({ wigs, wigsHair, wigsNylon, wigsSilicone, wigsAlgae, wigsSmart }, reduction) => {
  if (reduction > wigs) { throw new Error(`stock reduction ${reduction} is less than ${wigs} wigs`) }
  if (reduction === wigs) { return transform(new Array(5).fill(0), 0) }

  const stocks = [wigsSmart, wigsAlgae, wigsSilicone, wigsNylon, wigsHair]

  if (reduction > 0) {
    let remaining = reduction

    for (let index = 0; index < stocks.length; index += 1) {
      const adjustment = Math.min(stocks[index], remaining)
      stocks[index] -= adjustment
      remaining -= adjustment
      if (remaining === 0) { break }
    }
  }

  return transform(stocks, wigs - reduction)
}
