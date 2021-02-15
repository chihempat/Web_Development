function addressMaker(address) {
    const { city, state } = address;

    const newAddress = { city, state, country: "US" };

    console.log(`${newAddress.city},${newAddress.state},${newAddress.country}`)
}

addressMaker({ city: "NewYork", state: "NewYork" });