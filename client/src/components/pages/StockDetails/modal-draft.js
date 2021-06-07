<Modal open={buyOpen} onClose={handleBuyClose}
aria-labelledby="simple-modal-title"
aria-describedby="simple-modal-description">
<BuyModal modalStyle={modalStyle} classes={classes} setNumOfShares={setNumOfShares} setBuyPrice={setBuyPrice} />
</Modal>

<Modal open={sellOpen} onClose={handleSellClose}
aria-labelledby="simple-modal-title"
aria-describedby="simple-modal-description">
<SellModal modalStyle={modalStyle} classes={classes} setNumOfShares={setNumOfShares} setSellPrice={setSellPrice} />
</Modal>